import { QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "../config/aws";
import { Disaster, DisasterType } from '../types/disaster';

const TABLE_NAME = "disasters";

export const fetchDisasters = async (params?: {
  type?: DisasterType | 'all';
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
  severity?: string;
}): Promise<Disaster[]> => {
  try {
    let command;
    let expressionAttributeValues: Record<string, any> = {};
    let filterExpressions: string[] = [];
    let expressionAttributeNames: Record<string, string> = {};

    // Base query
    if (params?.type && params.type !== 'all') {
      filterExpressions.push('#kejadian = :kejadian');
      expressionAttributeNames['#kejadian'] = 'Kejadian';
      expressionAttributeValues[':kejadian'] = params.type.toUpperCase();
    }

    // Date range filter
    if (params?.startDate) {
      filterExpressions.push('#tanggal >= :startDate');
      expressionAttributeNames['#tanggal'] = 'Tanggal Kejadian';
      expressionAttributeValues[':startDate'] = params.startDate;
    }

    if (params?.endDate) {
      filterExpressions.push('#tanggal <= :endDate');
      expressionAttributeNames['#tanggal'] = 'Tanggal Kejadian';
      expressionAttributeValues[':endDate'] = params.endDate;
    }

    // Location search
    if (params?.searchQuery) {
      filterExpressions.push('contains(#lokasi, :searchQuery)');
      expressionAttributeNames['#lokasi'] = 'Lokasi';
      expressionAttributeValues[':searchQuery'] = params.searchQuery;
    }

    command = new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: filterExpressions.length > 0 ? filterExpressions.join(' AND ') : undefined,
      ExpressionAttributeNames: Object.keys(expressionAttributeNames).length > 0 ? expressionAttributeNames : undefined,
      ExpressionAttributeValues: Object.keys(expressionAttributeValues).length > 0 ? expressionAttributeValues : undefined,
    });

    const response = await dynamoDb.send(command);

    // Transform DynamoDB items to match your Disaster type
    return (response.Items || []).map(item => ({
      id: item['Kode Identitas Bencana'],
      type: item['Kejadian'].toLowerCase() as DisasterType,
      location: {
        lat: parseFloat(item['Lat'] || '0'), // Use the Lat field from DynamoDB
        lng: parseFloat(item['Lng'] || '0'), // Use the Lng field from DynamoDB
        name: item['Lokasi']
      },
      date: item['Tanggal Kejadian'],
      description: item['Penyebab'],
      severity: getSeverity(item),
      affected: {
        casualties: parseInt(item['Meninggal'] || '0'),
        displaced: parseInt(item['Hilang'] || '0'),
        injured: parseInt(item['Terluka'] || '0'),
        publicFacilitiesDamaged: parseInt(item['Fasum Rusak'] || '0'),
      }
    }));

  } catch (error) {
    console.error('DynamoDB Error:', error);
    throw new Error('Failed to fetch disasters');
  }
};

// Helper function untuk menentukan severity berdasarkan data
function getSeverity(item: any): 'low' | 'medium' | 'high' {
  const casualties = parseInt(item['Meninggal'] || '0');
  const displaced = parseInt(item['Hilang'] || '0');
  const injured = parseInt(item['Terluka'] || '0');
  const publicFacilitiesDamaged = parseInt(item['Fasum Rusak'] || '0');
  
  if (casualties > 10 || displaced > 100 || injured > 50 || publicFacilitiesDamaged > 10) {
    return 'high';
  } else if (casualties > 0 || displaced > 10 || injured > 10 || publicFacilitiesDamaged > 5) {
    return 'medium';
  }
  return 'low';
}