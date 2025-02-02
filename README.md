<div align="right">

<a href="README.md"><img src="https://flagcdn.com/w40/gb.png" width="25" alt="English"></a> | 
<a href="README-ID.md"><img src="https://flagcdn.com/w40/id.png" width="20" alt="Indonesian"></a>

</div>

# Indonesia Disaster Monitoring System

A cloud-based interactive website that provides real-time information about natural disasters in Indonesia using React, Leaflet.js, and Amazon Web Services (AWS). The system is designed to provide easy and quick access to disaster mitigation information for the public and stakeholders.

<br>

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-00A4EF?style=for-the-badge&logo=web&logoColor=white)](https://map-informasi-bencana.vercel.app/)  [![Documentation](https://img.shields.io/badge/Documentation-00A4EF?style=for-the-badge&logo=book&logoColor=white)](https://drive.google.com/file/d/1fNdvSFGxiFrcWCKH0iKVoJJOPUsXY9Po/view?usp=drive_link)

</div>

<br>

<div align="center">

![preview](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/preview.gif)

</div>

## Overview

This project is designed to visualize real-time natural disaster data using an interactive map equipped with specific icons for each type of disaster. The system leverages AWS cloud technology to ensure scalability and information availability, and is responsively designed to be accessible across various devices.

## How to Use

1. **Access Website**: Open the [website](https://zekia-map-bencana-indonesia.vercel.app/) through your browser.  
2. **Explore Map**: Use zoom and drag features to explore disaster locations across Indonesia.  
3. **Click Disaster Icons**: Get detailed information such as disaster type, location, time, and severity.  
4. **Use Filters**: Select specific disaster types through buttons on the right side of the screen.  
5. **View Mode**: Switch between light/dark modes via the button in the top right corner.

## Display Examples

### Interactive Map
![](./readmemedia/sslightmode.png)

### Disaster Details
![](./readmemedia/ssdetailbencana.png)

## Key Features

- **Real-Time Data**: Latest disaster information directly from BMKG API.  
- **Interactive Map**: Users can explore disaster locations with zoom, drag, and click icon features for detailed information.  
- **Disaster Filtering**: Select specific disaster types such as earthquakes, floods, or tsunamis.  
- **Light/Dark Mode**: Adjustable display for user comfort.  
- **Responsive Design**: Optimally accessible on desktop, tablet, and mobile devices.

## Tech Stack
![](./readmemedia/vite+react.gif)  

<div align="center">
   
![AWS](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/aws.gif)  ![Vercel](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/vercel.gif)  ![Leaflet.js](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/leaflet.gif)  ![Tailwind CSS](https://github.com/Ryan-infitech/Map-Informasi-Bencana/blob/main/readmemedia/tailwind.gif)

</div>

<br>

## Installation and Configuration

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/project-name.git
   cd project-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure `.env` file:**
   Create a `.env` file in the project root and enter the following variables:
   ```env
   VITE_AWS_ACCESS_KEY_ID=your-aws-key-id
   VITE_AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   VITE_AWS_REGION=your-aws-region
   ```

4. **Run local application:**
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel:**
   - Connect repository to Vercel account.
   - Set the same environment variables in the project settings on Vercel.
   - Deploy through Vercel dashboard.

## Development Plans

1. Adding early warning notification features.  
2. Integration with historical data for long-term analysis.  
3. Optimization for areas with low internet connectivity.  
4. Adding user personalization features.  
5. Development of data-based reports for policymakers.

## Contributions

Contributions in the form of code, ideas, or suggestions are welcome!  
1. Fork this repository.  
2. Create a branch for new features.  
3. Commit your changes.  
4. Push to your branch.  
5. Create a Pull Request.

## License

This project is protected by the MIT License. Please check the `LICENSE` file for more information.

## Contact

If you have any questions or suggestions, please open a new issue in this repository.

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/6285157517798)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/ryan.septiawan__/)
