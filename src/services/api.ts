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

    // Transform DynamoDB items to match Disaster type
    return (response.Items || []).map(item => ({
      id: item['Kode Identitas Bencana'],
      type: item['Kejadian'].toLowerCase() as DisasterType,
      location: {
        lat: parseFloat(item['Lat'] || '0'),
        lng: parseFloat(item['Lng'] || '0'),
        name: item['Lokasi']
      },
      date: item['Tanggal Kejadian'],
      description: item['Penyebab'],
      severity: getSeverityByDisasterType(item),
      affected: {
        casualties: parseInt(item['Meninggal'] || '0'),
        displaced: parseInt(item['Hilang'] || '0'),
        injured: parseInt(item['Terluka'] || '0'),
        publicFacilitiesDamaged: parseInt(item['Fasum Rusak'] || '0'),
        missing: parseInt(item['Hilang'] || '0'),
        housesDamaged: parseInt(item['Rumah Rusak'] || '0'),
        housesFlooded: parseInt(item['Rumah Terendam'] || '0')
      }
    }));

  } catch (error) {
    console.error('DynamoDB Error:', error);
    throw new Error('Failed to fetch disasters');
  }
};

// Helper function untuk menentukan severity berdasarkan jenis bencana
function getSeverityByDisasterType(item: any): 'low' | 'medium' | 'high' {
  const disasterType = item['Kejadian'].toLowerCase();
  const casualties = parseInt(item['Meninggal'] || '0');
  const displaced = parseInt(item['Pengungsi'] || '0');
  const injured = parseInt(item['Terluka'] || '0');
  const publicFacilitiesDamaged = parseInt(item['Fasum Rusak'] || '0');
  const missing = parseInt(item['Hilang'] || '0');
  const housesDamaged = parseInt(item['Rumah Rusak'] || '0');
  const housesFlooded = parseInt(item['Rumah Terendam'] || '0');
  
  // severity by disaster type
  switch (disasterType) {
    case 'gempa bumi':
      if (casualties > 100 || displaced > 50000 || injured > 1000 || publicFacilitiesDamaged > 100 || 
          missing > 100 || housesDamaged > 1000) {
        return 'high';
      } else if (casualties > 10 || displaced > 1000 || injured > 100 || publicFacilitiesDamaged > 20 || 
                missing > 20 || housesDamaged > 100) {
        return 'medium';
      } else if (casualties > 0 || displaced > 100 || injured > 10 || publicFacilitiesDamaged > 5 || 
                missing > 5 || housesDamaged > 50) {
        return 'low';
      }
      break;
      
    case 'banjir':
      if (casualties > 50 || displaced > 50000 || injured > 1000 || publicFacilitiesDamaged > 50 || 
          missing > 50 || housesDamaged > 10000 || housesFlooded > 3000) {
        return 'high';
      } else if (casualties > 2 || displaced > 5000 || injured > 100 || publicFacilitiesDamaged > 20 || 
                missing > 20 || housesDamaged > 1000 || housesFlooded > 300) {
        return 'medium';
      } else if (casualties > 0 || displaced > 500 || injured > 10 || publicFacilitiesDamaged > 5 || 
                missing > 5 || housesDamaged > 100 || housesFlooded > 100) {
        return 'low';
      }
      break;
      
    case 'tanah longsor':
      if (casualties > 50 || displaced > 1000 || injured > 200 || publicFacilitiesDamaged > 20 || 
          missing > 20 || housesDamaged > 500) {
        return 'high';
      } else if (casualties > 10 || displaced > 500 || injured > 50 || publicFacilitiesDamaged > 10 || 
                missing > 10 || housesDamaged > 100) {
        return 'medium';
      } else if (casualties > 0 || displaced > 100 || injured > 10 || publicFacilitiesDamaged > 5 || 
                missing > 5 || housesDamaged > 50) {
        return 'low';
      }
      break;
      
    case 'angin puting beliung':
    case 'angin kencang':
    case 'cuaca ekstrem':
      if (casualties > 20 || displaced > 10000 || injured > 500 || publicFacilitiesDamaged > 50 || 
          missing > 10 || housesDamaged > 1000) {
        return 'high';
      } else if (casualties > 5 || displaced > 1000 || injured > 100 || publicFacilitiesDamaged > 10 || 
                missing > 5 || housesDamaged > 100) {
        return 'medium';
      } else if (casualties > 0 || displaced > 100 || injured > 10 || publicFacilitiesDamaged > 5 || 
                housesDamaged > 50) {
        return 'low';
      }
      break;
      
    case 'kebakaran':
      if (casualties > 50 || displaced > 10000 || injured > 500 || publicFacilitiesDamaged > 50 || 
          missing > 20 || housesDamaged > 1000) {
        return 'high';
      } else if (casualties > 10 || displaced > 1000 || injured > 100 || publicFacilitiesDamaged > 10 || 
                missing > 10 || housesDamaged > 100) {
        return 'medium';
      } else if (casualties > 0 || displaced > 100 || injured > 10 || publicFacilitiesDamaged > 5 || 
                missing > 5 || housesDamaged > 50) {
        return 'low';
      }
      break;
      
    case 'tsunami':
      if (casualties > 1000 || displaced > 100000 || injured > 10000 || publicFacilitiesDamaged > 100 || 
          missing > 1000 || housesDamaged > 10000 || housesFlooded > 10000) {
        return 'high';
      } else if (casualties > 100 || displaced > 10000 || injured > 1000 || publicFacilitiesDamaged > 20 || 
                missing > 100 || housesDamaged > 1000 || housesFlooded > 1000) {
        return 'medium';
      } else if (casualties > 10 || displaced > 1000 || injured > 100 || publicFacilitiesDamaged > 5 || 
                missing > 10 || housesDamaged > 100 || housesFlooded > 100) {
        return 'low';
      }
      break;
      
    case 'gunung meletus':
      if (casualties > 100 || displaced > 50000 || injured > 1000 || publicFacilitiesDamaged > 50 || 
          missing > 50 || housesDamaged > 10000) {
        return 'high';
      } else if (casualties > 10 || displaced > 5000 || injured > 100 || publicFacilitiesDamaged > 20 || 
                missing > 10 || housesDamaged > 1000) {
        return 'medium';
      } else if (casualties > 0 || displaced > 500 || injured > 10 || publicFacilitiesDamaged > 5 || 
                missing > 5 || housesDamaged > 100) {
        return 'low';
      }
      break;
      
    case 'kekeringan':
      if (casualties > 100 || displaced > 10000 || injured > 1000 || publicFacilitiesDamaged > 20 || 
          missing > 10 || housesDamaged > 1000) {
        return 'high';
      } else if (casualties > 10 || displaced > 1000 || injured > 100 || publicFacilitiesDamaged > 10 || 
                missing > 5 || housesDamaged > 100) {
        return 'medium';
      } else if (casualties > 0 || displaced > 100 || injured > 10 || publicFacilitiesDamaged > 5 || 
                housesDamaged > 50) {
        return 'low';
      }
      break;
      
    case 'gelombang pasang':
    case 'abrasi':
      if (casualties > 20 || displaced > 5000 || injured > 500 || publicFacilitiesDamaged > 50 || 
          missing > 10 || housesDamaged > 500 || housesFlooded > 500) {
        return 'high';
      } else if (casualties > 5 || displaced > 1000 || injured > 100 || publicFacilitiesDamaged > 10 || 
                missing > 5 || housesDamaged > 100 || housesFlooded > 100) {
        return 'medium';
      } else if (casualties > 0 || displaced > 100 || injured > 10 || publicFacilitiesDamaged > 5 || 
                housesDamaged > 50 || housesFlooded > 50) {
        return 'low';
      }
      break;
      
    default:
      // Default severity calculation for tipe bencana yang tidak terdaftar
      if (casualties > 10 || displaced > 200 || injured > 50 || publicFacilitiesDamaged > 10 || 
          missing > 10 || housesDamaged > 50 || housesFlooded > 50) {
        return 'high';
      } else if (casualties > 0 || displaced > 10 || injured > 10 || publicFacilitiesDamaged > 5 || 
                missing > 5 || housesDamaged > 20 || housesFlooded > 20) {
        return 'medium';
      }
  }
  
  return 'low';
}