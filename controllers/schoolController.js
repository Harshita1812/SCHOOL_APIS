import axios from 'axios';
import {addSchool , getSchools} from "../models/schoolModel.js"

const ORS_API_KEY= process.env.ORS_API_KEY;


// ADDING NEW SCHOOLS
export const addSchoolController = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    try {
        if (!name || !address || !latitude || !longitude){
            return res.status(400).json({error: 'All fields are required'});
        }
        // USE OF MODEL METHOD TO INSERT DATA 
        await addSchool(name, address, latitude, longitude);
        res.status(201).json({ message: " school added Successfully! " });
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    };
};


// SHOW THE SHCOOLS 
export const listSchoolsController = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
    
        // VALIDATION FOR LATITUDE AND LONGITUDE
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and Longitude are required' });
        }; 

       
        const lat = parseFloat(latitude.trim());
        const lon = parseFloat(longitude.trim());
         if(isNaN(lat) || isNaN(lon)){
            return res.status(400).json({error:"invalid latitude or longitude"})
         }

        // FETCH ALL SCHOOLS FROM THE DATABASE;
         const schools = await getSchools();


        //LOCATION FOR API KEY;
        const userLocation = [lat, lon];
        const schoolLocations = schools.map(school => [school.latitude, school.longitude]); 
        const locations = [userLocation, ...schoolLocations];

        //CALLING OpenRouteService MAtrix API
        const orsResponse = await axios.post(
            'https://api.openrouteservice.org/v2/matrix/driving-car',
            {
                locations: locations,
                metrics: ['distance'],
                units: 'm'
            },
            {
                headers:{
                    Authorization: ORS_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );

        //ADDING DISTACES OF SCHOOLS FOr sorting
        const distances = orsResponse.data.distances[0].slice(1); 

        const sortedSchools = schools.map((school, i)=>({
            ...school,
            distance_in_meters: distances[i]
        })).sort((a,b)=>a.distance_in_meters - b.distance_in_meters); // we have two parameters latitude and longitude
        res.json(sortedSchools);
    } 

    catch (error) {
        res.status(500).json({ error: error.message });
    };
};