const cities = [
    {city_id:"1",name:"Mumbai"},
    {city_id:"2",name:"Delhi"},
    {city_id:"3",name:"Bangalore"},
    {city_id:"4",name:"Kolkata"},
    {city_id:"5",name:"Chennai"},
    {city_id:"6",name:"Hyderabad"},
    {city_id:"7",name:"Ahmedabad"},
    {city_id:"8",name:"Pune"},
    {city_id:"9",name:"Surat"},
    {city_id:"10",name:"Jaipur"},
    {city_id:"11",name:"Lucknow"},
    {city_id:"12",name:"Kanpur"},
    {city_id:"13",name:"Nagpur"},
    {city_id:"14",name:"Indore"},
    {city_id:"15",name:"Thane"},
    {city_id:"16",name:"Bhopal"},
    {city_id:"17",name:"Visakhapatnam"},
    {city_id:"18",name:"Pimpri-Chinchwad"},
    {city_id:"19",name:"Patna"},
    {city_id:"20",name:"Vadodara"},
    {city_id:"21",name:"Ghaziabad"},
    {city_id:"22",name:"Ludhiana"},
    {city_id:"23",name:"Agra"},
    {city_id:"24",name:"Nashik"},
    {city_id:"25",name:"Faridabad"},
    {city_id:"26",name:"Meerut"},
    {city_id:"27",name:"Rajkot"},
    {city_id:"28",name:"Kalyan-Dombivli"},
    {city_id:"29",name:"Vasai-Virar"},
    {city_id:"30",name:"Varanasi"},
    {city_id:"31",name:"Srinagar"},
    {city_id:"32",name:"Aurangabad"},
    {city_id:"33",name:"Dhanbad"},
    {city_id:"34",name:"Amritsar"},
    {city_id:"35",name:"Navi Mumbai"},
    {city_id:"36",name:"Allahabad"},
    {city_id:"37",name:"Howrah"},
    {city_id:"38",name:"Ranchi"},
    {city_id:"39",name:"Gwalior"},
    {city_id:"40",name:"Jabalpur"},
    {city_id:"41",name:"Coimbatore"},
    {city_id:"42",name:"Vijayawada"},
    {city_id:"43",name:"Jodhpur"},
    {city_id:"44",name:"Madurai"},
    {city_id:"45",name:"Raipur"},
    {city_id:"46",name:"Kota"},
    {city_id:"47",name:"Guwahati"},
    {city_id:"48",name:"Chandigarh"},
    {city_id:"49",name:"Solapur"},
    {city_id:"50",name:"Hubli-Dharwad"},
    {city_id:"51",name:"Bareilly"},
    {city_id:"52",name:"Moradabad"},
    {city_id:"53",name:"Mysore"},
    {city_id:"54",name:"Gurgaon"},
    {city_id:"55",name:"Aligarh"},
    {city_id:"56",name:"Jalandhar"},
    {city_id:"57",name:"Tiruchirappalli"},
    {city_id:"58",name:"Bhubaneswar"},
    {city_id:"59",name:"Salem"},
    {city_id:"60",name:"Warangal"},
    {city_id:"61",name:"Guntur"},
    {city_id:"62",name:"Bhiwandi"},
    {city_id:"63",name:"Saharanpur"},
    {city_id:"64",name:"Gorakhpur"},
    {city_id:"65",name:"Bikaner"},
    {city_id:"66",name:"Amravati"},
    {city_id:"67",name:"Noida"},
    {city_id:"68",name:"Jamshedpur"},
    {city_id:"69",name:"Bhilai"},
    {city_id:"70",name:"Cuttack"},
    {city_id:"71",name:"Firozabad"},
    {city_id:"72",name:"Kochi"},
    {city_id:"73",name:"Nellore"},
    {city_id:"74",name:"Bhavnagar"},
    {city_id:"75",name:"Dehradun"},
    {city_id:"76",name:"Durgapur"},
    {city_id:"77",name:"Asansol"},
    {city_id:"78",name:"Rourkela"},
    {city_id:"79",name:"Nanded"},
    {city_id:"80",name:"Kolhapur"},
    {city_id:"81",name:"Ajmer"},
    {city_id:"82",name:"Akola"},
    {city_id:"83",name:"Gulbarga"},
    {city_id:"84",name:"Jamnagar"},
    {city_id:"85",name:"Ujjain"},
    {city_id:"86",name:"Loni"},
    {city_id:"87",name:"Siliguri"},
    {city_id:"88",name:"Jhansi"},
    {city_id:"89",name:"Ulhasnagar"},
    {city_id:"90",name:"Jammu"},
    {city_id:"91",name:"Sangli-Miraj & Kupwad"},
    {city_id:"92",name:"Mangalore"},
    {city_id:"93",name:"Erode"},
    {city_id:"94",name:"Belgaum"},
    {city_id:"95",name:"Kurnool"},
    {city_id:"96",name:"Ambattur"},
    {city_id:"97",name:"Rajpur Sonarpur"},
    {city_id:"98",name:"Bokaro"},
    {city_id:"99",name:"South Dumdum"},
    {city_id:"100",name:"Ichalkaranji"},
    {city_id:"101",name:"Tirunelveli"},
    {city_id:"102",name:"Malegaon"},
    {city_id:"103",name:"Gaya"},
    {city_id:"104",name:"Jalgaon"},
    {city_id:"105",name:"Udaipur"},
    {city_id:"106",name:"Maheshtala"},
    {city_id:"107",name:"Tirupur"},
    {city_id:"108",name:"Davanagere"},
    {city_id:"109",name:"Kozhikode"},
    {city_id:"110",name:"Akbarpur"},
    {city_id:"111",name:"Shivamogga"},
    {city_id:"112",name:"Ratlam"},
    {city_id:"113",name:"Satna"},
    {city_id:"114",name:"Chandrapur"},
    {city_id:"115",name:"Haripur"},
    {city_id:"116",name:"Bilaspur"},
    {city_id:"117",name:"Imphal"},
    {city_id:"118",name:"Thanjavur"},
    {city_id:"119",name:"Kollam"},
    {city_id:"120",name:"Nagarcoil"},
    {city_id:"121",name:"Vellore"},
    {city_id:"122",name:"Pondicherry"},
    {city_id:"123",name:"Sagar"},
    {city_id:"124",name:"Tiruvottiyur"},
    {city_id:"125",name:"Dindigul"},
    {city_id:"126",name:"Thanjavur"},
    {city_id:"127",name:"Kollam"},
    {city_id:"128",name:"Nagarcoil"},
    {city_id:"129",name:"Vellore"},
    {city_id:"130",name:"Pondicherry"},
    {city_id:"131",name:"Sagar"},
    {city_id:"132",name:"Tiruvottiyur"},
    {city_id:"133",name:"Dindigul"},
    {city_id:"134",name:"Kadapa"},
    {city_id:"135",name:"Brahmapur"},
    {city_id:"136",name:"Alwar"},
    {city_id:"137",name:"Katihar"},
    {city_id:"138",name:"Ongole"},
    {city_id:"139",name:"Sikar"},
    {city_id:"140",name:"Tumkur"},
    {city_id:"141",name:"Khammam"},
    {city_id:"142",name:"Mathura"},
    {city_id:"143",name:"Ajmer"},
    {city_id:"144",name:"Shivpuri"},
    {city_id:"145",name:"Gangapur"},
    {city_id:"146",name:"Sagar"},
    {city_id:"147",name:"Shillong"},
    {city_id:"148",name:"Sambalpur"},
    {city_id:"149",name:"Ujjain"},
    {city_id:"150",name:"Basti"},
    {city_id:"151",name:"Kharagpur"},
    {city_id:"152",name:"Dhanbad"},
    {city_id:"153",name:"Bidar"},
    {city_id:"154",name:"Orai"},
    {city_id:"155",name:"Bhadrak"},
    {city_id:"156",name:"Bathinda"},
    {city_id:"157",name:"Rampur"},
    {city_id:"158",name:"Shimla"},
    {city_id:"159",name:"Nizamabad"},
    {city_id:"160",name:"Machilipatnam"},
    {city_id:"161",name:"Raich"}]

export const cityList = cities.slice(0, 50).sort();