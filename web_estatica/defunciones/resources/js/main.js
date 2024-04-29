

let canvasC = InitConfigCanvas("myCanvas",window.innerWidth,window.innerHeight);
let canvas = canvasC.canvas;
let ctx = canvasC.ctx;

let canvasR = InitConfigCanvas("canvasRef",window.innerWidth,window.innerHeight);
canvasRef = canvasR.canvas;
let ctxRef = canvasR.ctx;

let canvasRB = InitConfigCanvas("canvasRefBubbles",300,450);
canvasRefB = canvasRB.canvas;
let ctxRefB = canvasRB.ctx;

let bbox;
let padding,width,height,Xrange,Yrange;

//*********************************************************************************************************************

//let peopleData =  createSynteticPeopleData();
let raw_data;
let csv_data = `Anio,Estado,sexo,def_suicidio,def_agresion
2004,Aguascalientes,niño,9.0,2.0
2004,Aguascalientes,niña,2.0,0.0
2004,Baja California,niño,7.0,26.0
2004,Baja California,niña,2.0,13.0
2004,Baja California Sur,niño,2.0,0.0
2004,Baja California Sur,niña,1.0,2.0
2004,Campeche,niño,7.0,2.0
2004,Campeche,niña,4.0,0.0
2004,Chiapas,niño,4.0,25.0
2004,Chiapas,niña,5.0,14.0
2004,Chihuahua,niño,13.0,79.0
2004,Chihuahua,niña,4.0,18.0
2004,Ciudad de Mexico,niño,18.0,104.0
2004,Ciudad de Mexico,niña,7.0,24.0
2004,Coahuila,niño,7.0,16.0
2004,Coahuila,niña,1.0,3.0
2004,Colima,niño,2.0,2.0
2004,Colima,niña,0.0,3.0
2004,Durango,niño,2.0,21.0
2004,Durango,niña,0.0,4.0
2004,Guanajuato,niño,15.0,18.0
2004,Guanajuato,niña,6.0,6.0
2004,Guerrero,niño,5.0,22.0
2004,Guerrero,niña,9.0,9.0
2004,Hidalgo,niño,2.0,9.0
2004,Hidalgo,niña,4.0,1.0
2004,Jalisco,niño,12.0,33.0
2004,Jalisco,niña,7.0,7.0
2004,Mexico,niño,37.0,183.0
2004,Mexico,niña,29.0,111.0
2004,Michoacan,niño,9.0,35.0
2004,Michoacan,niña,7.0,14.0
2004,Morelos,niño,2.0,10.0
2004,Morelos,niña,2.0,6.0
2004,Nayarit,niño,1.0,10.0
2004,Nayarit,niña,2.0,3.0
2004,Nuevo Leon,niño,12.0,9.0
2004,Nuevo Leon,niña,3.0,7.0
2004,Oaxaca,niño,10.0,46.0
2004,Oaxaca,niña,2.0,20.0
2004,Puebla,niño,18.0,38.0
2004,Puebla,niña,10.0,14.0
2004,Queretaro,niño,8.0,5.0
2004,Queretaro,niña,3.0,1.0
2004,Quintana Roo,niño,5.0,6.0
2004,Quintana Roo,niña,2.0,3.0
2004,San Luis Potosi,niño,11.0,30.0
2004,San Luis Potosi,niña,2.0,0.0
2004,Sinaloa,niño,5.0,24.0
2004,Sinaloa,niña,3.0,4.0
2004,Sonora,niño,5.0,10.0
2004,Sonora,niña,1.0,7.0
2004,Tabasco,niño,10.0,3.0
2004,Tabasco,niña,5.0,4.0
2004,Tamaulipas,niño,6.0,16.0
2004,Tamaulipas,niña,3.0,9.0
2004,Tlaxcala,niño,3.0,5.0
2004,Tlaxcala,niña,1.0,4.0
2004,Veracruz,niño,22.0,24.0
2004,Veracruz,niña,12.0,5.0
2004,Yucatan,niño,5.0,1.0
2004,Yucatan,niña,2.0,2.0
2004,Zacatecas,niño,2.0,9.0
2004,Zacatecas,niña,2.0,3.0
2005,Aguascalientes,niño,6.0,0.0
2005,Aguascalientes,niña,1.0,1.0
2005,Baja California,niño,4.0,0.0
2005,Baja California,niña,1.0,3.0
2005,Baja California Sur,niño,0.0,0.0
2005,Baja California Sur,niña,1.0,0.0
2005,Campeche,niño,2.0,0.0
2005,Campeche,niña,0.0,0.0
2005,Chiapas,niño,9.0,0.0
2005,Chiapas,niña,4.0,12.0
2005,Chihuahua,niño,12.0,0.0
2005,Chihuahua,niña,6.0,24.0
2005,Ciudad de Mexico,niño,20.0,0.0
2005,Ciudad de Mexico,niña,16.0,19.0
2005,Coahuila,niño,9.0,0.0
2005,Coahuila,niña,3.0,7.0
2005,Colima,niño,0.0,0.0
2005,Colima,niña,0.0,5.0
2005,Durango,niño,3.0,0.0
2005,Durango,niña,0.0,3.0
2005,Guanajuato,niño,22.0,0.0
2005,Guanajuato,niña,18.0,8.0
2005,Guerrero,niño,5.0,0.0
2005,Guerrero,niña,3.0,10.0
2005,Hidalgo,niño,4.0,0.0
2005,Hidalgo,niña,3.0,1.0
2005,Jalisco,niño,20.0,0.0
2005,Jalisco,niña,8.0,6.0
2005,Mexico,niño,24.0,0.0
2005,Mexico,niña,17.0,129.0
2005,Michoacan,niño,8.0,0.0
2005,Michoacan,niña,12.0,18.0
2005,Morelos,niño,3.0,0.0
2005,Morelos,niña,1.0,2.0
2005,Nayarit,niño,0.0,0.0
2005,Nayarit,niña,2.0,3.0
2005,Nuevo Leon,niño,7.0,0.0
2005,Nuevo Leon,niña,4.0,5.0
2005,Oaxaca,niño,9.0,0.0
2005,Oaxaca,niña,5.0,16.0
2005,Puebla,niño,16.0,0.0
2005,Puebla,niña,9.0,14.0
2005,Queretaro,niño,7.0,0.0
2005,Queretaro,niña,4.0,2.0
2005,Quintana Roo,niño,5.0,0.0
2005,Quintana Roo,niña,0.0,4.0
2005,San Luis Potosi,niño,13.0,0.0
2005,San Luis Potosi,niña,4.0,1.0
2005,Sinaloa,niño,5.0,0.0
2005,Sinaloa,niña,6.0,4.0
2005,Sonora,niño,7.0,0.0
2005,Sonora,niña,5.0,4.0
2005,Tabasco,niño,15.0,0.0
2005,Tabasco,niña,6.0,1.0
2005,Tamaulipas,niño,6.0,0.0
2005,Tamaulipas,niña,2.0,6.0
2005,Tlaxcala,niño,6.0,2.0
2005,Tlaxcala,niña,5.0,0.0
2005,Veracruz,niño,13.0,12.0
2005,Veracruz,niña,11.0,7.0
2005,Yucatan,niño,6.0,2.0
2005,Yucatan,niña,1.0,0.0
2005,Zacatecas,niño,3.0,2.0
2005,Zacatecas,niña,1.0,1.0
2008,Aguascalientes,niño,2.0,9.0
2008,Aguascalientes,niña,0.0,3.0
2008,Baja California,niño,8.0,87.0
2008,Baja California,niña,3.0,9.0
2008,Baja California Sur,niño,1.0,0.0
2008,Baja California Sur,niña,0.0,1.0
2008,Campeche,niño,4.0,7.0
2008,Campeche,niña,2.0,2.0
2008,Chiapas,niño,6.0,26.0
2008,Chiapas,niña,3.0,6.0
2008,Chihuahua,niño,11.0,179.0
2008,Chihuahua,niña,8.0,25.0
2008,Ciudad de Mexico,niño,16.0,77.0
2008,Ciudad de Mexico,niña,18.0,26.0
2008,Coahuila,niño,13.0,15.0
2008,Coahuila,niña,2.0,5.0
2008,Colima,niño,1.0,5.0
2008,Colima,niña,0.0,4.0
2008,Durango,niño,7.0,27.0
2008,Durango,niña,2.0,7.0
2008,Guanajuato,niño,31.0,23.0
2008,Guanajuato,niña,15.0,8.0
2008,Guerrero,niño,4.0,38.0
2008,Guerrero,niña,7.0,21.0
2008,Hidalgo,niño,7.0,5.0
2008,Hidalgo,niña,3.0,4.0
2008,Jalisco,niño,15.0,42.0
2008,Jalisco,niña,9.0,14.0
2008,Mexico,niño,37.0,159.0
2008,Mexico,niña,26.0,60.0
2008,Michoacan,niño,14.0,34.0
2008,Michoacan,niña,13.0,11.0
2008,Morelos,niño,5.0,21.0
2008,Morelos,niña,3.0,4.0
2008,Nayarit,niño,3.0,12.0
2008,Nayarit,niña,3.0,2.0
2008,Nuevo Leon,niño,18.0,24.0
2008,Nuevo Leon,niña,7.0,2.0
2008,Oaxaca,niño,16.0,50.0
2008,Oaxaca,niña,13.0,11.0
2008,Puebla,niño,21.0,34.0
2008,Puebla,niña,11.0,8.0
2008,Queretaro,niño,2.0,12.0
2008,Queretaro,niña,1.0,1.0
2008,Quintana Roo,niño,7.0,11.0
2008,Quintana Roo,niña,6.0,3.0
2008,San Luis Potosi,niño,15.0,26.0
2008,San Luis Potosi,niña,6.0,8.0
2008,Sinaloa,niño,6.0,53.0
2008,Sinaloa,niña,1.0,4.0
2008,Sonora,niño,10.0,20.0
2008,Sonora,niña,3.0,12.0
2008,Tabasco,niño,13.0,9.0
2008,Tabasco,niña,6.0,4.0
2008,Tamaulipas,niño,3.0,8.0
2008,Tamaulipas,niña,3.0,9.0
2008,Tlaxcala,niño,1.0,6.0
2008,Tlaxcala,niña,1.0,0.0
2008,Veracruz,niño,14.0,29.0
2008,Veracruz,niña,9.0,15.0
2008,Yucatan,niño,4.0,5.0
2008,Yucatan,niña,7.0,2.0
2008,Zacatecas,niño,0.0,7.0
2008,Zacatecas,niña,1.0,3.0
2009,Aguascalientes,niño,5.0,5.0
2009,Aguascalientes,niña,0.0,7.0
2009,Baja California,niño,10.0,69.0
2009,Baja California,niña,1.0,27.0
2009,Baja California Sur,niño,3.0,6.0
2009,Baja California Sur,niña,2.0,2.0
2009,Campeche,niño,11.0,4.0
2009,Campeche,niña,4.0,4.0
2009,Chiapas,niño,12.0,22.0
2009,Chiapas,niña,11.0,26.0
2009,Chihuahua,niño,15.0,289.0
2009,Chihuahua,niña,7.0,40.0
2009,Ciudad de Mexico,niño,17.0,58.0
2009,Ciudad de Mexico,niña,17.0,18.0
2009,Coahuila,niño,6.0,31.0
2009,Coahuila,niña,7.0,5.0
2009,Colima,niño,2.0,4.0
2009,Colima,niña,1.0,2.0
2009,Durango,niño,9.0,88.0
2009,Durango,niña,7.0,8.0
2009,Guanajuato,niño,28.0,76.0
2009,Guanajuato,niña,13.0,2.0
2009,Guerrero,niño,7.0,101.0
2009,Guerrero,niña,9.0,27.0
2009,Hidalgo,niño,4.0,14.0
2009,Hidalgo,niña,1.0,6.0
2009,Jalisco,niño,21.0,56.0
2009,Jalisco,niña,12.0,11.0
2009,Mexico,niño,34.0,149.0
2009,Mexico,niña,38.0,81.0
2009,Michoacan,niño,18.0,41.0
2009,Michoacan,niña,5.0,9.0
2009,Morelos,niño,4.0,10.0
2009,Morelos,niña,4.0,4.0
2009,Nayarit,niño,5.0,12.0
2009,Nayarit,niña,1.0,4.0
2009,Nuevo Leon,niño,13.0,27.0
2009,Nuevo Leon,niña,10.0,4.0
2009,Oaxaca,niño,13.0,52.0
2009,Oaxaca,niña,8.0,11.0
2009,Puebla,niño,15.0,23.0
2009,Puebla,niña,15.0,13.0
2009,Queretaro,niño,6.0,15.0
2009,Queretaro,niña,7.0,5.0
2009,Quintana Roo,niño,6.0,5.0
2009,Quintana Roo,niña,4.0,0.0
2009,San Luis Potosi,niño,16.0,32.0
2009,San Luis Potosi,niña,9.0,9.0
2009,Sinaloa,niño,2.0,119.0
2009,Sinaloa,niña,3.0,17.0
2009,Sonora,niño,8.0,30.0
2009,Sonora,niña,3.0,10.0
2009,Tabasco,niño,12.0,17.0
2009,Tabasco,niña,6.0,6.0
2009,Tamaulipas,niño,8.0,9.0
2009,Tamaulipas,niña,9.0,10.0
2009,Tlaxcala,niño,2.0,5.0
2009,Tlaxcala,niña,4.0,1.0
2009,Veracruz,niño,20.0,51.0
2009,Veracruz,niña,13.0,32.0
2009,Yucatan,niño,10.0,4.0
2009,Yucatan,niña,4.0,0.0
2009,Zacatecas,niño,4.0,18.0
2009,Zacatecas,niña,6.0,5.0
2010,Aguascalientes,niño,0.0,14.0
2010,Aguascalientes,niña,4.0,2.0
2010,Baja California,niño,3.0,89.0
2010,Baja California,niña,3.0,16.0
2010,Baja California Sur,niño,2.0,7.0
2010,Baja California Sur,niña,0.0,1.0
2010,Campeche,niño,1.0,0.0
2010,Campeche,niña,1.0,1.0
2010,Chiapas,niño,7.0,16.0
2010,Chiapas,niña,0.0,8.0
2010,Chihuahua,niño,11.0,483.0
2010,Chihuahua,niña,9.0,109.0
2010,Ciudad de Mexico,niño,23.0,77.0
2010,Ciudad de Mexico,niña,15.0,29.0
2010,Coahuila,niño,5.0,52.0
2010,Coahuila,niña,4.0,8.0
2010,Colima,niño,2.0,8.0
2010,Colima,niña,2.0,0.0
2010,Durango,niño,7.0,88.0
2010,Durango,niña,4.0,21.0
2010,Guanajuato,niño,31.0,44.0
2010,Guanajuato,niña,11.0,6.0
2010,Guerrero,niño,6.0,103.0
2010,Guerrero,niña,5.0,22.0
2010,Hidalgo,niño,6.0,14.0
2010,Hidalgo,niña,5.0,6.0
2010,Jalisco,niño,32.0,63.0
2010,Jalisco,niña,16.0,10.0
2010,Mexico,niño,67.0,191.0
2010,Mexico,niña,42.0,79.0
2010,Michoacan,niño,7.0,45.0
2010,Michoacan,niña,6.0,13.0
2010,Morelos,niño,5.0,47.0
2010,Morelos,niña,3.0,10.0
2010,Nayarit,niño,1.0,38.0
2010,Nayarit,niña,0.0,6.0
2010,Nuevo Leon,niño,10.0,70.0
2010,Nuevo Leon,niña,6.0,12.0
2010,Oaxaca,niño,13.0,44.0
2010,Oaxaca,niña,12.0,7.0
2010,Puebla,niño,25.0,28.0
2010,Puebla,niña,14.0,10.0
2010,Queretaro,niño,7.0,3.0
2010,Queretaro,niña,1.0,2.0
2010,Quintana Roo,niño,7.0,12.0
2010,Quintana Roo,niña,2.0,4.0
2010,San Luis Potosi,niño,11.0,27.0
2010,San Luis Potosi,niña,4.0,11.0
2010,Sinaloa,niño,5.0,148.0
2010,Sinaloa,niña,5.0,31.0
2010,Sonora,niño,6.0,42.0
2010,Sonora,niña,9.0,12.0
2010,Tabasco,niño,12.0,6.0
2010,Tabasco,niña,3.0,2.0
2010,Tamaulipas,niño,6.0,58.0
2010,Tamaulipas,niña,2.0,16.0
2010,Tlaxcala,niño,3.0,1.0
2010,Tlaxcala,niña,0.0,1.0
2010,Veracruz,niño,14.0,30.0
2010,Veracruz,niña,10.0,16.0
2010,Yucatan,niño,10.0,3.0
2010,Yucatan,niña,8.0,4.0
2010,Zacatecas,niño,4.0,22.0
2010,Zacatecas,niña,1.0,2.0
2011,Aguascalientes,niño,3.0,14.0
2011,Aguascalientes,niña,3.0,4.0
2011,Baja California,niño,10.0,36.0
2011,Baja California,niña,6.0,16.0
2011,Baja California Sur,niño,0.0,0.0
2011,Baja California Sur,niña,2.0,3.0
2011,Campeche,niño,5.0,2.0
2011,Campeche,niña,1.0,0.0
2011,Chiapas,niño,16.0,4.0
2011,Chiapas,niña,13.0,2.0
2011,Chihuahua,niño,13.0,306.0
2011,Chihuahua,niña,13.0,73.0
2011,Ciudad de Mexico,niño,40.0,77.0
2011,Ciudad de Mexico,niña,20.0,13.0
2011,Coahuila,niño,9.0,75.0
2011,Coahuila,niña,5.0,9.0
2011,Colima,niño,1.0,9.0
2011,Colima,niña,1.0,6.0
2011,Durango,niño,4.0,42.0
2011,Durango,niña,4.0,11.0
2011,Guanajuato,niño,37.0,64.0
2011,Guanajuato,niña,14.0,12.0
2011,Guerrero,niño,6.0,245.0
2011,Guerrero,niña,12.0,43.0
2011,Hidalgo,niño,17.0,17.0
2011,Hidalgo,niña,15.0,7.0
2011,Jalisco,niño,39.0,138.0
2011,Jalisco,niña,20.0,23.0
2011,Mexico,niño,52.0,215.0
2011,Mexico,niña,48.0,91.0
2011,Michoacan,niño,17.0,47.0
2011,Michoacan,niña,9.0,11.0
2011,Morelos,niño,5.0,30.0
2011,Morelos,niña,2.0,5.0
2011,Nayarit,niño,3.0,36.0
2011,Nayarit,niña,0.0,12.0
2011,Nuevo Leon,niño,6.0,226.0
2011,Nuevo Leon,niña,6.0,25.0
2011,Oaxaca,niño,12.0,56.0
2011,Oaxaca,niña,5.0,19.0
2011,Puebla,niño,27.0,33.0
2011,Puebla,niña,20.0,16.0
2011,Queretaro,niño,8.0,13.0
2011,Queretaro,niña,10.0,3.0
2011,Quintana Roo,niño,11.0,2.0
2011,Quintana Roo,niña,3.0,2.0
2011,San Luis Potosi,niño,15.0,39.0
2011,San Luis Potosi,niña,11.0,13.0
2011,Sinaloa,niño,6.0,119.0
2011,Sinaloa,niña,6.0,21.0
2011,Sonora,niño,9.0,27.0
2011,Sonora,niña,4.0,14.0
2011,Tabasco,niño,13.0,10.0
2011,Tabasco,niña,11.0,6.0
2011,Tamaulipas,niño,10.0,80.0
2011,Tamaulipas,niña,1.0,12.0
2011,Tlaxcala,niño,6.0,4.0
2011,Tlaxcala,niña,3.0,0.0
2011,Veracruz,niño,22.0,103.0
2011,Veracruz,niña,12.0,20.0
2011,Yucatan,niño,9.0,2.0
2011,Yucatan,niña,4.0,0.0
2011,Zacatecas,niño,5.0,34.0
2011,Zacatecas,niña,1.0,4.0
2013,Aguascalientes,niño,8.0,7.0
2013,Aguascalientes,niña,0.0,2.0
2013,Baja California,niño,8.0,18.0
2013,Baja California,niña,3.0,9.0
2013,Baja California Sur,niño,1.0,2.0
2013,Baja California Sur,niña,0.0,4.0
2013,Campeche,niño,4.0,5.0
2013,Campeche,niña,4.0,7.0
2013,Chiapas,niño,12.0,17.0
2013,Chiapas,niña,15.0,3.0
2013,Chihuahua,niño,15.0,144.0
2013,Chihuahua,niña,10.0,23.0
2013,Ciudad de Mexico,niño,30.0,52.0
2013,Ciudad de Mexico,niña,14.0,16.0
2013,Coahuila,niño,9.0,83.0
2013,Coahuila,niña,5.0,17.0
2013,Colima,niño,3.0,6.0
2013,Colima,niña,1.0,3.0
2013,Durango,niño,4.0,39.0
2013,Durango,niña,1.0,13.0
2013,Guanajuato,niño,28.0,37.0
2013,Guanajuato,niña,17.0,7.0
2013,Guerrero,niño,5.0,181.0
2013,Guerrero,niña,8.0,40.0
2013,Hidalgo,niño,4.0,12.0
2013,Hidalgo,niña,3.0,2.0
2013,Jalisco,niño,32.0,106.0
2013,Jalisco,niña,15.0,19.0
2013,Mexico,niño,52.0,237.0
2013,Mexico,niña,35.0,81.0
2013,Michoacan,niño,10.0,41.0
2013,Michoacan,niña,5.0,15.0
2013,Morelos,niño,4.0,55.0
2013,Morelos,niña,4.0,12.0
2013,Nayarit,niño,1.0,11.0
2013,Nayarit,niña,3.0,5.0
2013,Nuevo Leon,niño,15.0,87.0
2013,Nuevo Leon,niña,3.0,19.0
2013,Oaxaca,niño,13.0,51.0
2013,Oaxaca,niña,7.0,24.0
2013,Puebla,niño,16.0,35.0
2013,Puebla,niña,14.0,15.0
2013,Queretaro,niño,9.0,6.0
2013,Queretaro,niña,8.0,3.0
2013,Quintana Roo,niño,2.0,8.0
2013,Quintana Roo,niña,4.0,7.0
2013,San Luis Potosi,niño,17.0,20.0
2013,San Luis Potosi,niña,2.0,13.0
2013,Sinaloa,niño,3.0,73.0
2013,Sinaloa,niña,5.0,12.0
2013,Sonora,niño,8.0,28.0
2013,Sonora,niña,5.0,12.0
2013,Tabasco,niño,11.0,10.0
2013,Tabasco,niña,11.0,6.0
2013,Tamaulipas,niño,9.0,82.0
2013,Tamaulipas,niña,2.0,15.0
2013,Tlaxcala,niño,4.0,14.0
2013,Tlaxcala,niña,3.0,5.0
2013,Veracruz,niño,12.0,66.0
2013,Veracruz,niña,11.0,20.0
2013,Yucatan,niño,7.0,3.0
2013,Yucatan,niña,4.0,0.0
2013,Zacatecas,niño,4.0,34.0
2013,Zacatecas,niña,1.0,9.0
2014,Aguascalientes,niño,8.0,6.0
2014,Aguascalientes,niña,1.0,1.0
2014,Baja California,niño,5.0,29.0
2014,Baja California,niña,0.0,8.0
2014,Baja California Sur,niño,3.0,1.0
2014,Baja California Sur,niña,0.0,2.0
2014,Campeche,niño,1.0,1.0
2014,Campeche,niña,5.0,2.0
2014,Chiapas,niño,29.0,8.0
2014,Chiapas,niña,14.0,5.0
2014,Chihuahua,niño,13.0,80.0
2014,Chihuahua,niña,12.0,36.0
2014,Ciudad de Mexico,niño,27.0,63.0
2014,Ciudad de Mexico,niña,24.0,17.0
2014,Coahuila,niño,8.0,50.0
2014,Coahuila,niña,5.0,19.0
2014,Colima,niño,1.0,7.0
2014,Colima,niña,0.0,4.0
2014,Durango,niño,3.0,19.0
2014,Durango,niña,5.0,4.0
2014,Guanajuato,niño,39.0,67.0
2014,Guanajuato,niña,19.0,14.0
2014,Guerrero,niño,2.0,130.0
2014,Guerrero,niña,7.0,36.0
2014,Hidalgo,niño,8.0,16.0
2014,Hidalgo,niña,6.0,5.0
2014,Jalisco,niño,30.0,57.0
2014,Jalisco,niña,17.0,14.0
2014,Mexico,niño,66.0,193.0
2014,Mexico,niña,45.0,81.0
2014,Michoacan,niño,15.0,67.0
2014,Michoacan,niña,10.0,15.0
2014,Morelos,niño,2.0,31.0
2014,Morelos,niña,3.0,5.0
2014,Nayarit,niño,3.0,8.0
2014,Nayarit,niña,5.0,1.0
2014,Nuevo Leon,niño,11.0,58.0
2014,Nuevo Leon,niña,4.0,9.0
2014,Oaxaca,niño,13.0,52.0
2014,Oaxaca,niña,4.0,24.0
2014,Puebla,niño,26.0,37.0
2014,Puebla,niña,16.0,12.0
2014,Queretaro,niño,7.0,2.0
2014,Queretaro,niña,3.0,3.0
2014,Quintana Roo,niño,6.0,2.0
2014,Quintana Roo,niña,6.0,2.0
2014,San Luis Potosi,niño,17.0,19.0
2014,San Luis Potosi,niña,10.0,12.0
2014,Sinaloa,niño,1.0,76.0
2014,Sinaloa,niña,8.0,21.0
2014,Sonora,niño,10.0,26.0
2014,Sonora,niña,3.0,12.0
2014,Tabasco,niño,5.0,16.0
2014,Tabasco,niña,6.0,1.0
2014,Tamaulipas,niño,3.0,61.0
2014,Tamaulipas,niña,2.0,32.0
2014,Tlaxcala,niño,4.0,6.0
2014,Tlaxcala,niña,5.0,6.0
2014,Veracruz,niño,15.0,41.0
2014,Veracruz,niña,16.0,14.0
2014,Yucatan,niño,7.0,2.0
2014,Yucatan,niña,2.0,0.0
2014,Zacatecas,niño,4.0,22.0
2014,Zacatecas,niña,4.0,4.0
2015,Aguascalientes,niño,8.0,0.0
2015,Aguascalientes,niña,0.0,2.0
2015,Baja California,niño,6.0,22.0
2015,Baja California,niña,0.0,14.0
2015,Baja California Sur,niño,1.0,6.0
2015,Baja California Sur,niña,0.0,3.0
2015,Campeche,niño,5.0,2.0
2015,Campeche,niña,0.0,1.0
2015,Chiapas,niño,21.0,27.0
2015,Chiapas,niña,0.0,16.0
2015,Chihuahua,niño,15.0,129.0
2015,Chihuahua,niña,0.0,18.0
2015,Ciudad de Mexico,niño,24.0,59.0
2015,Ciudad de Mexico,niña,0.0,12.0
2015,Coahuila,niño,9.0,30.0
2015,Coahuila,niña,0.0,5.0
2015,Colima,niño,6.0,12.0
2015,Colima,niña,0.0,3.0
2015,Durango,niño,8.0,24.0
2015,Durango,niña,0.0,5.0
2015,Guanajuato,niño,39.0,77.0
2015,Guanajuato,niña,0.0,12.0
2015,Guerrero,niño,2.0,184.0
2015,Guerrero,niña,0.0,36.0
2015,Hidalgo,niño,10.0,8.0
2015,Hidalgo,niña,0.0,5.0
2015,Jalisco,niño,25.0,62.0
2015,Jalisco,niña,0.0,32.0
2015,Mexico,niño,66.0,176.0
2015,Mexico,niña,0.0,92.0
2015,Michoacan,niño,10.0,45.0
2015,Michoacan,niña,0.0,21.0
2015,Morelos,niño,4.0,27.0
2015,Morelos,niña,0.0,10.0
2015,Nayarit,niño,6.0,4.0
2015,Nayarit,niña,0.0,2.0
2015,Nuevo Leon,niño,12.0,43.0
2015,Nuevo Leon,niña,0.0,19.0
2015,Oaxaca,niño,12.0,32.0
2015,Oaxaca,niña,0.0,14.0
2015,Puebla,niño,17.0,40.0
2015,Puebla,niña,0.0,9.0
2015,Queretaro,niño,5.0,9.0
2015,Queretaro,niña,0.0,5.0
2015,Quintana Roo,niño,5.0,9.0
2015,Quintana Roo,niña,0.0,3.0
2015,San Luis Potosi,niño,14.0,27.0
2015,San Luis Potosi,niña,0.0,15.0
2015,Sinaloa,niño,5.0,35.0
2015,Sinaloa,niña,0.0,9.0
2015,Sonora,niño,9.0,26.0
2015,Sonora,niña,0.0,14.0
2015,Tabasco,niño,9.0,18.0
2015,Tabasco,niña,0.0,6.0
2015,Tamaulipas,niño,9.0,60.0
2015,Tamaulipas,niña,0.0,16.0
2015,Tlaxcala,niño,6.0,2.0
2015,Tlaxcala,niña,0.0,4.0
2015,Veracruz,niño,15.0,59.0
2015,Veracruz,niña,0.0,9.0
2015,Yucatan,niño,8.0,9.0
2015,Yucatan,niña,0.0,2.0
2015,Zacatecas,niño,5.0,40.0
2015,Zacatecas,niña,0.0,5.0
2020,Aguascalientes,niño,0.0,6.0
2020,Aguascalientes,niña,0.0,3.0
2020,Baja California,niño,0.0,58.0
2020,Baja California,niña,0.0,20.0
2020,Baja California Sur,niño,0.0,3.0
2020,Baja California Sur,niña,0.0,0.0
2020,Campeche,niño,0.0,2.0
2020,Campeche,niña,0.0,0.0
2020,Chiapas,niño,0.0,31.0
2020,Chiapas,niña,0.0,12.0
2020,Chihuahua,niño,0.0,177.0
2020,Chihuahua,niña,0.0,31.0
2020,Ciudad de Mexico,niño,0.0,75.0
2020,Ciudad de Mexico,niña,0.0,9.0
2020,Coahuila,niño,0.0,18.0
2020,Coahuila,niña,0.0,3.0
2020,Colima,niño,0.0,14.0
2020,Colima,niña,0.0,9.0
2020,Durango,niño,0.0,6.0
2020,Durango,niña,0.0,3.0
2020,Guanajuato,niño,0.0,380.0
2020,Guanajuato,niña,0.0,76.0
2020,Guerrero,niño,0.0,73.0
2020,Guerrero,niña,0.0,17.0
2020,Hidalgo,niño,0.0,19.0
2020,Hidalgo,niña,0.0,4.0
2020,Jalisco,niño,0.0,91.0
2020,Jalisco,niña,0.0,21.0
2020,Mexico,niño,0.0,174.0
2020,Mexico,niña,0.0,61.0
2020,Michoacan,niño,0.0,135.0
2020,Michoacan,niña,0.0,32.0
2020,Morelos,niño,0.0,63.0
2020,Morelos,niña,0.0,17.0
2020,Nayarit,niño,0.0,10.0
2020,Nayarit,niña,0.0,2.0
2020,Nuevo Leon,niño,0.0,64.0
2020,Nuevo Leon,niña,0.0,14.0
2020,Oaxaca,niño,0.0,44.0
2020,Oaxaca,niña,0.0,19.0
2020,Puebla,niño,0.0,50.0
2020,Puebla,niña,0.0,9.0
2020,Queretaro,niño,0.0,5.0
2020,Queretaro,niña,0.0,4.0
2020,Quintana Roo,niño,0.0,29.0
2020,Quintana Roo,niña,0.0,7.0
2020,San Luis Potosi,niño,0.0,54.0
2020,San Luis Potosi,niña,0.0,10.0
2020,Sinaloa,niño,0.0,38.0
2020,Sinaloa,niña,0.0,2.0
2020,Sonora,niño,0.0,56.0
2020,Sonora,niña,0.0,18.0
2020,Tabasco,niño,0.0,32.0
2020,Tabasco,niña,0.0,5.0
2020,Tamaulipas,niño,0.0,57.0
2020,Tamaulipas,niña,0.0,8.0
2020,Tlaxcala,niño,0.0,4.0
2020,Tlaxcala,niña,0.0,1.0
2020,Veracruz,niño,0.0,42.0
2020,Veracruz,niña,0.0,24.0
2020,Yucatan,niño,0.0,7.0
2020,Yucatan,niña,0.0,0.0
2020,Zacatecas,niño,0.0,109.0
2020,Zacatecas,niña,0.0,25.0
2000,Aguascalientes,niño,0.0,1.0
2000,Aguascalientes,niña,0.0,0.0
2000,Baja California,niño,0.0,23.0
2000,Baja California,niña,0.0,2.0
2000,Baja California Sur,niño,0.0,1.0
2000,Baja California Sur,niña,0.0,0.0
2000,Campeche,niño,0.0,8.0
2000,Campeche,niña,0.0,2.0
2000,Chiapas,niño,0.0,43.0
2000,Chiapas,niña,0.0,9.0
2000,Chihuahua,niño,0.0,78.0
2000,Chihuahua,niña,0.0,15.0
2000,Ciudad de Mexico,niño,0.0,78.0
2000,Ciudad de Mexico,niña,0.0,22.0
2000,Coahuila,niño,0.0,22.0
2000,Coahuila,niña,0.0,2.0
2000,Colima,niño,0.0,5.0
2000,Colima,niña,0.0,7.0
2000,Durango,niño,0.0,6.0
2000,Durango,niña,0.0,1.0
2000,Guanajuato,niño,0.0,43.0
2000,Guanajuato,niña,0.0,7.0
2000,Guerrero,niño,0.0,30.0
2000,Guerrero,niña,0.0,17.0
2000,Hidalgo,niño,0.0,4.0
2000,Hidalgo,niña,0.0,5.0
2000,Jalisco,niño,0.0,27.0
2000,Jalisco,niña,0.0,12.0
2000,Mexico,niño,0.0,290.0
2000,Mexico,niña,0.0,91.0
2000,Michoacan,niño,0.0,61.0
2000,Michoacan,niña,0.0,9.0
2000,Morelos,niño,0.0,20.0
2000,Morelos,niña,0.0,6.0
2000,Nayarit,niño,0.0,14.0
2000,Nayarit,niña,0.0,2.0
2000,Nuevo Leon,niño,0.0,8.0
2000,Nuevo Leon,niña,0.0,3.0
2000,Oaxaca,niño,0.0,60.0
2000,Oaxaca,niña,0.0,14.0
2000,Puebla,niño,0.0,32.0
2000,Puebla,niña,0.0,19.0
2000,Queretaro,niño,0.0,7.0
2000,Queretaro,niña,0.0,3.0
2000,Quintana Roo,niño,0.0,4.0
2000,Quintana Roo,niña,0.0,2.0
2000,San Luis Potosi,niño,0.0,46.0
2000,San Luis Potosi,niña,0.0,10.0
2000,Sinaloa,niño,0.0,44.0
2000,Sinaloa,niña,0.0,8.0
2000,Sonora,niño,0.0,16.0
2000,Sonora,niña,0.0,1.0
2000,Tabasco,niño,0.0,8.0
2000,Tabasco,niña,0.0,4.0
2000,Tamaulipas,niño,0.0,17.0
2000,Tamaulipas,niña,0.0,13.0
2000,Tlaxcala,niño,0.0,7.0
2000,Tlaxcala,niña,0.0,2.0
2000,Veracruz,niño,0.0,42.0
2000,Veracruz,niña,0.0,14.0
2000,Yucatan,niño,0.0,3.0
2000,Yucatan,niña,0.0,2.0
2000,Zacatecas,niño,0.0,4.0
2000,Zacatecas,niña,0.0,0.0
2007,Aguascalientes,niño,0.0,0.0
2007,Aguascalientes,niña,0.0,0.0
2007,Baja California,niño,0.0,0.0
2007,Baja California,niña,0.0,0.0
2007,Baja California Sur,niño,0.0,0.0
2007,Baja California Sur,niña,0.0,0.0
2007,Campeche,niño,0.0,0.0
2007,Campeche,niña,0.0,0.0
2007,Chiapas,niño,0.0,0.0
2007,Chiapas,niña,0.0,0.0
2007,Chihuahua,niño,0.0,0.0
2007,Chihuahua,niña,0.0,0.0
2007,Ciudad de Mexico,niño,0.0,0.0
2007,Ciudad de Mexico,niña,0.0,0.0
2007,Coahuila,niño,0.0,0.0
2007,Coahuila,niña,0.0,0.0
2007,Colima,niño,0.0,0.0
2007,Colima,niña,0.0,0.0
2007,Durango,niño,0.0,0.0
2007,Durango,niña,0.0,0.0
2007,Guanajuato,niño,0.0,0.0
2007,Guanajuato,niña,0.0,0.0
2007,Guerrero,niño,0.0,0.0
2007,Guerrero,niña,0.0,0.0
2007,Hidalgo,niño,0.0,0.0
2007,Hidalgo,niña,0.0,0.0
2007,Jalisco,niño,0.0,0.0
2007,Jalisco,niña,0.0,0.0
2007,Mexico,niño,0.0,0.0
2007,Mexico,niña,0.0,0.0
2007,Michoacan,niño,0.0,0.0
2007,Michoacan,niña,0.0,0.0
2007,Morelos,niño,0.0,0.0
2007,Morelos,niña,0.0,0.0
2007,Nayarit,niño,0.0,0.0
2007,Nayarit,niña,0.0,0.0
2007,Nuevo Leon,niño,0.0,0.0
2007,Nuevo Leon,niña,0.0,0.0
2007,Oaxaca,niño,0.0,0.0
2007,Oaxaca,niña,0.0,0.0
2007,Puebla,niño,0.0,0.0
2007,Puebla,niña,0.0,0.0
2007,Queretaro,niño,0.0,0.0
2007,Queretaro,niña,0.0,0.0
2007,Quintana Roo,niño,0.0,0.0
2007,Quintana Roo,niña,0.0,0.0
2007,San Luis Potosi,niño,0.0,0.0
2007,San Luis Potosi,niña,0.0,0.0
2007,Sinaloa,niño,0.0,0.0
2007,Sinaloa,niña,0.0,0.0
2007,Sonora,niño,0.0,0.0
2007,Sonora,niña,0.0,0.0
2007,Tabasco,niño,0.0,0.0
2007,Tabasco,niña,0.0,0.0
2007,Tamaulipas,niño,0.0,0.0
2007,Tamaulipas,niña,0.0,0.0
2007,Tlaxcala,niño,0.0,0.0
2007,Tlaxcala,niña,0.0,0.0
2007,Veracruz,niño,0.0,0.0
2007,Veracruz,niña,0.0,0.0
2007,Yucatan,niño,0.0,1.0
2007,Yucatan,niña,0.0,1.0
2007,Zacatecas,niño,0.0,0.0
2007,Zacatecas,niña,0.0,0.0
2009,Aguascalientes,niño,0.0,0.0
2009,Aguascalientes,niña,0.0,0.0
2009,Baja California,niño,0.0,0.0
2009,Baja California,niña,0.0,0.0
2009,Baja California Sur,niño,0.0,0.0
2009,Baja California Sur,niña,0.0,0.0
2009,Campeche,niño,0.0,0.0
2009,Campeche,niña,0.0,0.0
2009,Chiapas,niño,0.0,0.0
2009,Chiapas,niña,0.0,0.0
2009,Chihuahua,niño,0.0,0.0
2009,Chihuahua,niña,0.0,0.0
2009,Ciudad de Mexico,niño,0.0,0.0
2009,Ciudad de Mexico,niña,0.0,0.0
2009,Coahuila,niño,0.0,0.0
2009,Coahuila,niña,0.0,0.0
2009,Colima,niño,0.0,0.0
2009,Colima,niña,0.0,0.0
2009,Durango,niño,0.0,0.0
2009,Durango,niña,0.0,0.0
2009,Guanajuato,niño,0.0,0.0
2009,Guanajuato,niña,0.0,0.0
2009,Guerrero,niño,0.0,0.0
2009,Guerrero,niña,0.0,0.0
2009,Hidalgo,niño,0.0,0.0
2009,Hidalgo,niña,0.0,0.0
2009,Jalisco,niño,0.0,0.0
2009,Jalisco,niña,0.0,0.0
2009,Mexico,niño,0.0,0.0
2009,Mexico,niña,0.0,0.0
2009,Michoacan,niño,0.0,0.0
2009,Michoacan,niña,0.0,0.0
2009,Morelos,niño,0.0,0.0
2009,Morelos,niña,0.0,0.0
2009,Nayarit,niño,0.0,0.0
2009,Nayarit,niña,0.0,0.0
2009,Nuevo Leon,niño,0.0,0.0
2009,Nuevo Leon,niña,0.0,0.0
2009,Oaxaca,niño,0.0,0.0
2009,Oaxaca,niña,0.0,0.0
2009,Puebla,niño,0.0,0.0
2009,Puebla,niña,0.0,0.0
2009,Queretaro,niño,0.0,0.0
2009,Queretaro,niña,0.0,0.0
2009,Quintana Roo,niño,0.0,0.0
2009,Quintana Roo,niña,0.0,0.0
2009,San Luis Potosi,niño,0.0,0.0
2009,San Luis Potosi,niña,0.0,0.0
2009,Sinaloa,niño,0.0,0.0
2009,Sinaloa,niña,0.0,0.0
2009,Sonora,niño,0.0,0.0
2009,Sonora,niña,0.0,0.0
2009,Tabasco,niño,0.0,0.0
2009,Tabasco,niña,0.0,0.0
2009,Tamaulipas,niño,0.0,0.0
2009,Tamaulipas,niña,0.0,0.0
2009,Tlaxcala,niño,0.0,0.0
2009,Tlaxcala,niña,0.0,0.0
2009,Veracruz,niño,0.0,0.0
2009,Veracruz,niña,0.0,0.0
2009,Yucatan,niño,0.0,0.0
2009,Yucatan,niña,0.0,0.0
2009,Zacatecas,niño,0.0,0.0
2009,Zacatecas,niña,0.0,0.0
2016,Aguascalientes,niño,0.0,6.0
2016,Aguascalientes,niña,1.0,0.0
2016,Baja California,niño,0.0,39.0
2016,Baja California,niña,6.0,19.0
2016,Baja California Sur,niño,0.0,4.0
2016,Baja California Sur,niña,2.0,2.0
2016,Campeche,niño,0.0,4.0
2016,Campeche,niña,4.0,0.0
2016,Chiapas,niño,0.0,20.0
2016,Chiapas,niña,13.0,14.0
2016,Chihuahua,niño,0.0,109.0
2016,Chihuahua,niña,16.0,18.0
2016,Ciudad de Mexico,niño,0.0,86.0
2016,Ciudad de Mexico,niña,13.0,13.0
2016,Coahuila,niño,0.0,15.0
2016,Coahuila,niña,4.0,5.0
2016,Colima,niño,0.0,30.0
2016,Colima,niña,0.0,11.0
2016,Durango,niño,0.0,18.0
2016,Durango,niña,5.0,2.0
2016,Guanajuato,niño,0.0,74.0
2016,Guanajuato,niña,25.0,11.0
2016,Guerrero,niño,0.0,187.0
2016,Guerrero,niña,8.0,26.0
2016,Hidalgo,niño,0.0,9.0
2016,Hidalgo,niña,12.0,8.0
2016,Jalisco,niño,0.0,79.0
2016,Jalisco,niña,23.0,21.0
2016,Mexico,niño,0.0,186.0
2016,Mexico,niña,45.0,61.0
2016,Michoacan,niño,0.0,71.0
2016,Michoacan,niña,12.0,21.0
2016,Morelos,niño,0.0,27.0
2016,Morelos,niña,4.0,8.0
2016,Nayarit,niño,0.0,9.0
2016,Nayarit,niña,1.0,4.0
2016,Nuevo Leon,niño,0.0,35.0
2016,Nuevo Leon,niña,9.0,15.0
2016,Oaxaca,niño,0.0,37.0
2016,Oaxaca,niña,7.0,11.0
2016,Puebla,niño,0.0,48.0
2016,Puebla,niña,12.0,12.0
2016,Queretaro,niño,0.0,5.0
2016,Queretaro,niña,6.0,3.0
2016,Quintana Roo,niño,0.0,10.0
2016,Quintana Roo,niña,2.0,5.0
2016,San Luis Potosi,niño,0.0,34.0
2016,San Luis Potosi,niña,11.0,6.0
2016,Sinaloa,niño,0.0,66.0
2016,Sinaloa,niña,5.0,7.0
2016,Sonora,niño,0.0,30.0
2016,Sonora,niña,9.0,8.0
2016,Tabasco,niño,0.0,22.0
2016,Tabasco,niña,6.0,8.0
2016,Tamaulipas,niño,0.0,73.0
2016,Tamaulipas,niña,5.0,30.0
2016,Tlaxcala,niño,0.0,3.0
2016,Tlaxcala,niña,5.0,0.0
2016,Veracruz,niño,0.0,57.0
2016,Veracruz,niña,4.0,26.0
2016,Yucatan,niño,0.0,3.0
2016,Yucatan,niña,3.0,0.0
2016,Zacatecas,niño,0.0,65.0
2016,Zacatecas,niña,1.0,15.0
2017,Aguascalientes,niño,0.0,2.0
2017,Aguascalientes,niña,0.0,2.0
2017,Baja California,niño,0.0,63.0
2017,Baja California,niña,0.0,25.0
2017,Baja California Sur,niño,0.0,35.0
2017,Baja California Sur,niña,0.0,11.0
2017,Campeche,niño,0.0,0.0
2017,Campeche,niña,0.0,0.0
2017,Chiapas,niño,0.0,51.0
2017,Chiapas,niña,0.0,13.0
2017,Chihuahua,niño,0.0,155.0
2017,Chihuahua,niña,0.0,34.0
2017,Ciudad de Mexico,niño,0.0,92.0
2017,Ciudad de Mexico,niña,0.0,22.0
2017,Coahuila,niño,0.0,16.0
2017,Coahuila,niña,0.0,6.0
2017,Colima,niño,0.0,42.0
2017,Colima,niña,0.0,8.0
2017,Durango,niño,0.0,15.0
2017,Durango,niña,0.0,6.0
2017,Guanajuato,niño,0.0,161.0
2017,Guanajuato,niña,0.0,30.0
2017,Guerrero,niño,0.0,223.0
2017,Guerrero,niña,0.0,28.0
2017,Hidalgo,niño,0.0,4.0
2017,Hidalgo,niña,0.0,9.0
2017,Jalisco,niño,0.0,86.0
2017,Jalisco,niña,0.0,14.0
2017,Mexico,niño,0.0,234.0
2017,Mexico,niña,47.0,76.0
2017,Michoacan,niño,0.0,107.0
2017,Michoacan,niña,7.0,25.0
2017,Morelos,niño,0.0,34.0
2017,Morelos,niña,3.0,8.0
2017,Nayarit,niño,0.0,22.0
2017,Nayarit,niña,1.0,5.0
2017,Nuevo Leon,niño,0.0,43.0
2017,Nuevo Leon,niña,3.0,10.0
2017,Oaxaca,niño,0.0,56.0
2017,Oaxaca,niña,2.0,13.0
2017,Puebla,niño,0.0,61.0
2017,Puebla,niña,27.0,11.0
2017,Queretaro,niño,0.0,9.0
2017,Queretaro,niña,6.0,16.0
2017,Quintana Roo,niño,0.0,32.0
2017,Quintana Roo,niña,5.0,3.0
2017,San Luis Potosi,niño,0.0,47.0
2017,San Luis Potosi,niña,7.0,8.0
2017,Sinaloa,niño,0.0,84.0
2017,Sinaloa,niña,4.0,16.0
2017,Sonora,niño,0.0,14.0
2017,Sonora,niña,2.0,7.0
2017,Tabasco,niño,0.0,33.0
2017,Tabasco,niña,6.0,4.0
2017,Tamaulipas,niño,0.0,130.0
2017,Tamaulipas,niña,1.0,30.0
2017,Tlaxcala,niño,0.0,10.0
2017,Tlaxcala,niña,2.0,3.0
2017,Veracruz,niño,0.0,93.0
2017,Veracruz,niña,7.0,38.0
2017,Yucatan,niño,0.0,1.0
2017,Yucatan,niña,1.0,0.0
2017,Zacatecas,niño,0.0,49.0
2017,Zacatecas,niña,2.0,22.0
2018,Aguascalientes,niño,0.0,14.0
2018,Aguascalientes,niña,0.0,4.0
2018,Baja California,niño,0.0,84.0
2018,Baja California,niña,0.0,9.0
2018,Baja California Sur,niño,0.0,9.0
2018,Baja California Sur,niña,0.0,7.0
2018,Campeche,niño,0.0,1.0
2018,Campeche,niña,0.0,2.0
2018,Chiapas,niño,0.0,24.0
2018,Chiapas,niña,0.0,11.0
2018,Chihuahua,niño,0.0,142.0
2018,Chihuahua,niña,0.0,40.0
2018,Ciudad de Mexico,niño,0.0,58.0
2018,Ciudad de Mexico,niña,0.0,10.0
2018,Coahuila,niño,0.0,11.0
2018,Coahuila,niña,0.0,7.0
2018,Colima,niño,0.0,24.0
2018,Colima,niña,0.0,6.0
2018,Durango,niño,0.0,6.0
2018,Durango,niña,0.0,2.0
2018,Guanajuato,niño,0.0,222.0
2018,Guanajuato,niña,0.0,49.0
2018,Guerrero,niño,0.0,165.0
2018,Guerrero,niña,0.0,24.0
2018,Hidalgo,niño,0.0,24.0
2018,Hidalgo,niña,0.0,6.0
2018,Jalisco,niño,0.0,136.0
2018,Jalisco,niña,0.0,40.0
2018,Mexico,niño,0.0,172.0
2018,Mexico,niña,0.0,94.0
2018,Michoacan,niño,0.0,130.0
2018,Michoacan,niña,0.0,46.0
2018,Morelos,niño,0.0,55.0
2018,Morelos,niña,0.0,13.0
2018,Nayarit,niño,0.0,17.0
2018,Nayarit,niña,0.0,7.0
2018,Nuevo Leon,niño,0.0,50.0
2018,Nuevo Leon,niña,0.0,10.0
2018,Oaxaca,niño,0.0,51.0
2018,Oaxaca,niña,0.0,21.0
2018,Puebla,niño,0.0,55.0
2018,Puebla,niña,0.0,14.0
2018,Queretaro,niño,0.0,17.0
2018,Queretaro,niña,0.0,6.0
2018,Quintana Roo,niño,0.0,34.0
2018,Quintana Roo,niña,0.0,11.0
2018,San Luis Potosi,niño,0.0,60.0
2018,San Luis Potosi,niña,0.0,9.0
2018,Sinaloa,niño,0.0,27.0
2018,Sinaloa,niña,0.0,5.0
2018,Sonora,niño,0.0,31.0
2018,Sonora,niña,0.0,7.0
2018,Tabasco,niño,0.0,41.0
2018,Tabasco,niña,0.0,2.0
2018,Tamaulipas,niño,0.0,85.0
2018,Tamaulipas,niña,0.0,17.0
2018,Tlaxcala,niño,0.0,2.0
2018,Tlaxcala,niña,0.0,0.0
2018,Veracruz,niño,0.0,101.0
2018,Veracruz,niña,0.0,14.0
2018,Yucatan,niño,0.0,0.0
2018,Yucatan,niña,0.0,3.0
2018,Zacatecas,niño,0.0,42.0
2018,Zacatecas,niña,0.0,21.0
2019,Aguascalientes,niño,0.0,3.0
2019,Aguascalientes,niña,0.0,2.0
2019,Baja California,niño,0.0,100.0
2019,Baja California,niña,0.0,16.0
2019,Baja California Sur,niño,0.0,1.0
2019,Baja California Sur,niña,0.0,0.0
2019,Campeche,niño,0.0,0.0
2019,Campeche,niña,0.0,0.0
2019,Chiapas,niño,0.0,24.0
2019,Chiapas,niña,0.0,13.0
2019,Chihuahua,niño,0.0,159.0
2019,Chihuahua,niña,0.0,48.0
2019,Ciudad de Mexico,niño,0.0,49.0
2019,Ciudad de Mexico,niña,0.0,5.0
2019,Coahuila,niño,0.0,9.0
2019,Coahuila,niña,0.0,16.0
2019,Colima,niño,0.0,23.0
2019,Colima,niña,0.0,12.0
2019,Durango,niño,0.0,12.0
2019,Durango,niña,0.0,2.0
2019,Guanajuato,niño,0.0,288.0
2019,Guanajuato,niña,0.0,50.0
2019,Guerrero,niño,0.0,110.0
2019,Guerrero,niña,0.0,36.0
2019,Hidalgo,niño,0.0,33.0
2019,Hidalgo,niña,0.0,6.0
2019,Jalisco,niño,0.0,108.0
2019,Jalisco,niña,0.0,40.0
2019,Mexico,niño,0.0,189.0
2019,Mexico,niña,0.0,67.0
2019,Michoacan,niño,0.0,127.0
2019,Michoacan,niña,0.0,26.0
2019,Morelos,niño,0.0,75.0
2019,Morelos,niña,0.0,15.0
2019,Nayarit,niño,0.0,12.0
2019,Nayarit,niña,0.0,0.0
2019,Nuevo Leon,niño,0.0,65.0
2019,Nuevo Leon,niña,0.0,9.0
2019,Oaxaca,niño,0.0,47.0
2019,Oaxaca,niña,0.0,18.0
2019,Puebla,niño,0.0,75.0
2019,Puebla,niña,0.0,20.0
2019,Queretaro,niño,0.0,13.0
2019,Queretaro,niña,0.0,3.0
2019,Quintana Roo,niño,0.0,42.0
2019,Quintana Roo,niña,0.0,10.0
2019,San Luis Potosi,niño,0.0,38.0
2019,San Luis Potosi,niña,0.0,13.0
2019,Sinaloa,niño,0.0,25.0
2019,Sinaloa,niña,0.0,7.0
2019,Sonora,niño,0.0,33.0
2019,Sonora,niña,0.0,13.0
2019,Tabasco,niño,0.0,48.0
2019,Tabasco,niña,0.0,8.0
2019,Tamaulipas,niño,0.0,46.0
2019,Tamaulipas,niña,0.0,20.0
2019,Tlaxcala,niño,0.0,5.0
2019,Tlaxcala,niña,0.0,4.0
2019,Veracruz,niño,0.0,85.0
2019,Veracruz,niña,0.0,20.0
2019,Yucatan,niño,0.0,3.0
2019,Yucatan,niña,0.0,0.0
2019,Zacatecas,niño,0.0,43.0
2019,Zacatecas,niña,0.0,20.0
2021,Aguascalientes,niño,11.0,8.0
2021,Aguascalientes,niña,7.0,2.0
2021,Baja California,niño,4.0,77.0
2021,Baja California,niña,4.0,17.0
2021,Baja California Sur,niño,2.0,0.0
2021,Baja California Sur,niña,1.0,2.0
2021,Campeche,niño,3.0,4.0
2021,Campeche,niña,3.0,3.0
2021,Chiapas,niño,25.0,39.0
2021,Chiapas,niña,13.0,9.0
2021,Chihuahua,niño,30.0,139.0
2021,Chihuahua,niña,22.0,21.0
2021,Ciudad de Mexico,niño,25.0,62.0
2021,Ciudad de Mexico,niña,16.0,12.0
2021,Coahuila,niño,9.0,8.0
2021,Coahuila,niña,5.0,5.0
2021,Colima,niño,1.0,19.0
2021,Colima,niña,1.0,8.0
2021,Durango,niño,3.0,14.0
2021,Durango,niña,3.0,3.0
2021,Guanajuato,niño,23.0,332.0
2021,Guanajuato,niña,17.0,73.0
2021,Guerrero,niño,1.0,70.0
2021,Guerrero,niña,1.0,21.0
2021,Hidalgo,niño,10.0,16.0
2021,Hidalgo,niña,7.0,2.0
2021,Jalisco,niño,20.0,85.0
2021,Jalisco,niña,21.0,32.0
2021,Mexico,niño,80.0,185.0
2021,Mexico,niña,53.0,66.0
2021,Michoacan,niño,20.0,174.0
2021,Michoacan,niña,13.0,42.0
2021,Morelos,niño,13.0,66.0
2021,Morelos,niña,4.0,9.0
2021,Nayarit,niño,2.0,12.0
2021,Nayarit,niña,1.0,11.0
2021,Nuevo Leon,niño,10.0,38.0
2021,Nuevo Leon,niña,7.0,9.0
2021,Oaxaca,niño,17.0,30.0
2021,Oaxaca,niña,13.0,10.0
2021,Puebla,niño,18.0,36.0
2021,Puebla,niña,22.0,14.0
2021,Queretaro,niño,7.0,12.0
2021,Queretaro,niña,7.0,4.0
2021,Quintana Roo,niño,4.0,36.0
2021,Quintana Roo,niña,9.0,12.0
2021,San Luis Potosi,niño,18.0,80.0
2021,San Luis Potosi,niña,11.0,13.0
2021,Sinaloa,niño,6.0,23.0
2021,Sinaloa,niña,5.0,2.0
2021,Sonora,niño,10.0,80.0
2021,Sonora,niña,9.0,13.0
2021,Tabasco,niño,8.0,11.0
2021,Tabasco,niña,2.0,6.0
2021,Tamaulipas,niño,11.0,37.0
2021,Tamaulipas,niña,7.0,10.0
2021,Tlaxcala,niño,2.0,7.0
2021,Tlaxcala,niña,2.0,1.0
2021,Veracruz,niño,10.0,37.0
2021,Veracruz,niña,8.0,8.0
2021,Yucatan,niño,12.0,1.0
2021,Yucatan,niña,1.0,0.0
2021,Zacatecas,niño,5.0,201.0
2021,Zacatecas,niña,2.0,45.0
2022,Aguascalientes,niño,7.0,1.0
2022,Aguascalientes,niña,5.0,0.0
2022,Baja California,niño,4.0,73.0
2022,Baja California,niña,3.0,10.0
2022,Baja California Sur,niño,2.0,0.0
2022,Baja California Sur,niña,1.0,2.0
2022,Campeche,niño,1.0,1.0
2022,Campeche,niña,0.0,1.0
2022,Chiapas,niño,17.0,17.0
2022,Chiapas,niña,15.0,12.0
2022,Chihuahua,niño,30.0,97.0
2022,Chihuahua,niña,17.0,30.0
2022,Ciudad de Mexico,niño,17.0,42.0
2022,Ciudad de Mexico,niña,20.0,12.0
2022,Coahuila,niño,8.0,5.0
2022,Coahuila,niña,7.0,9.0
2022,Colima,niño,2.0,41.0
2022,Colima,niña,0.0,6.0
2022,Durango,niño,3.0,11.0
2022,Durango,niña,5.0,3.0
2022,Guanajuato,niño,28.0,302.0
2022,Guanajuato,niña,19.0,76.0
2022,Guerrero,niño,5.0,97.0
2022,Guerrero,niña,0.0,22.0
2022,Hidalgo,niño,8.0,20.0
2022,Hidalgo,niña,6.0,3.0
2022,Jalisco,niño,25.0,79.0
2022,Jalisco,niña,24.0,17.0
2022,Mexico,niño,73.0,191.0
2022,Mexico,niña,51.0,78.0
2022,Michoacan,niño,17.0,173.0
2022,Michoacan,niña,9.0,36.0
2022,Morelos,niño,5.0,73.0
2022,Morelos,niña,4.0,19.0
2022,Nayarit,niño,8.0,13.0
2022,Nayarit,niña,6.0,1.0
2022,Nuevo Leon,niño,14.0,77.0
2022,Nuevo Leon,niña,12.0,12.0
2022,Oaxaca,niño,11.0,27.0
2022,Oaxaca,niña,9.0,12.0
2022,Puebla,niño,31.0,52.0
2022,Puebla,niña,18.0,10.0
2022,Queretaro,niño,12.0,5.0
2022,Queretaro,niña,8.0,8.0
2022,Quintana Roo,niño,6.0,55.0
2022,Quintana Roo,niña,4.0,4.0
2022,San Luis Potosi,niño,13.0,38.0
2022,San Luis Potosi,niña,10.0,9.0
2022,Sinaloa,niño,4.0,20.0
2022,Sinaloa,niña,4.0,5.0
2022,Sonora,niño,8.0,81.0
2022,Sonora,niña,1.0,12.0
2022,Tabasco,niño,12.0,18.0
2022,Tabasco,niña,9.0,9.0
2022,Tamaulipas,niño,6.0,16.0
2022,Tamaulipas,niña,5.0,3.0
2022,Tlaxcala,niño,4.0,18.0
2022,Tlaxcala,niña,7.0,1.0
2022,Veracruz,niño,12.0,35.0
2022,Veracruz,niña,9.0,14.0
2022,Yucatan,niño,13.0,2.0
2022,Yucatan,niña,3.0,0.0
2022,Zacatecas,niño,2.0,189.0
2022,Zacatecas,niña,5.0,27.0`;

function cargarCSV(){
    raw_data= d3.csvParse(csv_data);
}



///*********************************************************************************************************************

async function init() {
    try {
        await cargarCSV(); 
        datos=raw_data;
        

        //********************************************************************************************************************/
        // Obtenemos columnas necesarias transformadas
        /*********************************************************************************************************************/

        try{
            //datos = transformData(datos,"main");
            datos = getDataArray(datos,"main")
        }catch(e){
            console.error("No fue posible obtener y transformar los datos",e)
        }
                

        /******************************************************************************************************************* */
        // Ordenamos datos
        /******************************************************************************************************************* */

        try{
            datos = orderDataByColumn(datos, "def_suicidio", false);   //Descendente
        }catch(e){
            console.error("No fue posible aplicar el ordenamiento a los datos",e)
        }

        
       
        // *********************************************************************************************************************
        // 1. Calculamos bounding boxes para el dataset
        // *********************************************************************************************************************

        try{
            bbox = create_bbox(datos)
        }
        catch(e){
            console.error("No fue posible calcular el tamaño del bounding box",e);
        }

        padding = {bottom: 100, left: 100, right: 70, top: 200};
        width = canvas.width - padding.left - padding.right;
        height = canvas.height - padding.bottom - padding.top;

        Xrange = bbox.xmax - bbox.xmin;
        Yrange = bbox.ymax - bbox.ymin;


        //*********************************************************************************************************************
        /* Translate Origin point*/
        //*********************************************************************************************************************
        try{
            // Put the origin at the lower left corner of the visible area:
            ctx.translate(padding.left, padding.bottom);
        }
        catch(e){
            console.error("No fue posible definir el origen de datos",e)
        }


        //*********************************************************************************************************************
        // Draw the two bounding boxes
        //*********************************************************************************************************************
        try{
            //drawBBox(bbox,"gray",2)
        }
        catch(e){
            console.error("No fue posible dibujar la bounding box",e)
        }


        //*********************************************************************************************************************
        // Draw axes and labels
        //*********************************************************************************************************************


        try{
            drawAxes(ctx,bbox,'Estados','Estados',20,"white","white",2,datos,32);
        }catch(e){
            console.error("No fue posible dibujar los ejes del gráfico",e)
        }



        //*********************************************************************************************************************
        // Draw bubbles
        //*********************************************************************************************************************

        try{
            drawBubbles(ctx,ctxRef,ctxRefB,bbox,datos,"pink","white",2004,radioState);
        }catch(e){
            console.error("No fue posible dibujar las burbujas",e)
        }

    } catch (error) {
        console.error('Error al procesar datos:', error);
    }
}

init();


/*****LIsteners para interacción*********/
const yearSlider = document.getElementById('yearSlider');
const radios = document.querySelectorAll('.Impactcheck');


let selectedYear = yearSlider.value; // Obtener el año 
let radioState = getRadioState();

// Función para dibujar las burbujas con los parámetros seleccionados
function drawBubblesWithParams() {
    drawBubbles(ctx, ctxRef, ctxRefB,bbox, datos, "pink", "white", selectedYear, radioState);
}

// Listener deslizante
yearSlider.addEventListener('change', function() {
    selectedYear = yearSlider.value;
    drawBubblesWithParams();
});

// Listener de los botones de radio
radios.forEach(radio => { 
    radio.addEventListener('change', function() {
        radioState = getRadioState(); // Actualiza el estado de los botones de radio
        drawBubblesWithParams();
    });
});

function getRadioState() {
    return {
        def_suicidio: document.getElementById('def_suicidio').checked,
        def_agresion: document.getElementById('def_agresion').checked
    };
}


/*MOdal*/

const overlay = document.getElementById('overlay');
const closeButtons = document.getElementsByClassName('closeModal');
const openModal = document.getElementById('openModal');


for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', () => {
        overlay.style.opacity = '0'; // Cambiar la opacidad del overlay a 0
        setTimeout(() => {
            overlay.style.display = 'none'; 
            openModal.style.display = 'block'
        }, 500);
    });
}

openModal.addEventListener('click', () => {
    overlay.style.opacity = '1'; 
        setTimeout(() => {
            overlay.style.display = 'block';
            openModal.style.display = 'none'
        }, 50);
});



