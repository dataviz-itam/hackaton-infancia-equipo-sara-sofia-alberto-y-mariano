

let canvasC = InitConfigCanvas("myCanvas",window.innerWidth,window.innerHeight);
let canvas = canvasC.canvas;
let ctx = canvasC.ctx;

let canvasR = InitConfigCanvas("canvasRef",window.innerWidth,window.innerHeight);
canvasRef = canvasR.canvas;
let ctxRef = canvasR.ctx;

let canvasD = InitConfigCanvas("canvasRep",window.innerWidth,window.innerHeight);
canvasRep = canvasD.canvas;
let ctxRep = canvasD.ctx;

let canvasRB = InitConfigCanvas("canvasRefBubbles",300,450);
canvasRefB = canvasRB.canvas;
let ctxRefB = canvasRB.ctx;


let padding;
padding = {bottom: -50, left: 300, right: 150, top: 160};
let bbox;



//*********************************************************************************************************************


let raw_data;
let csv_data = `Anio,Estado,sexo,Tipo_incendio,total,afrodescendiente,Latitud,Longitud,indigena
2020,aguascalientes,niño,niño,235259,3006,22.0,-102.2876,292.0
2020,baja california,niño,niño,540200,7103,32.5,-116.2834,5306.0
2020,baja california sur,niño,niño,120324,3587,24.5,-111.6657,1040.0
2020,campeche,niño,niño,145698,2426,19.0,-90.5354,9938.0
2020,coahuila,niño,niño,499192,5762,29.0,-101.7072,314.0
2020,colima,niño,niño,106584,1658,19.2448,-103.7242,1022.0
2020,chiapas,niño,niño,1055127,8066,17.5,-93.1287,555082.0
2020,chihuahua,niño,niño,577776,7260,30.0,-106.0885,34380.0
2020,ciudad de mexico,niño,niño,1032167,15967,19.5,-99.1329,6888.0
2020,durango,niño,niño,311654,2179,25.5272,-105.0526,21004.0
2020,guanajuato,niño,niño,995676,13951,21.0185,-101.2582,3026.0
2020,guerrero,niño,niño,624384,49209,17.6643,-99.5431,173926.0
2020,hidalgo,niño,niño,484683,6448,20.0917,-98.762,70748.0
2020,jalisco,niño,niño,1283349,17000,20.6603,-103.349,17546.0
2020,mexico,niño,niño,2533881,34738,19.5,-99.7238,31502.0
2020,michoacan,niño,niño,780454,9511,19.5672,-101.7072,37914.0
2020,morelos,niño,niño,288940,4634,18.6818,-99.1008,5232.0
2020,nayarit,niño,niño,200760,1346,21.7519,-104.8451,26496.0
2020,nuevo leon,niño,niño,840727,11901,26.5917,-99.9958,4178.0
2020,oaxaca,niño,niño,691605,30696,17.0738,-96.726,280536.0
2020,puebla,niño,niño,1086443,14953,19.0419,-98.2059,123980.0
2020,queretaro,niño,niño,354468,5114,20.5887,-100.3893,4414.0
2020,quintana roo,niño,niño,275783,6502,19.1821,-87.4786,20358.0
2020,san luis potosi,niño,niño,445079,7322,22.0,-100.985,53504.0
2020,sinaloa,niño,niño,459290,5131,26.0,-108.4791,5952.0
2020,sonora,niño,niño,445690,5429,31.0,-111.9449,7828.0
2020,tabasco,niño,niño,396519,5072,17.8409,-92.6189,17328.0
2020,tamaulipas,niño,niño,531521,4950,25.0,-97.8363,804.0
2020,tlaxcala,niño,niño,213587,2202,19.3139,-98.2404,2574.0
2020,veracruz,niño,niño,1205365,26663,19.1738,-96.1342,141852.0
2020,yucatan,niño,niño,337805,9471,22.0,-88.0943,59076.0
2020,zacatecas,niño,niño,275383,1996,22.7709,-102.5832,1460.0
2020,aguascalientes,niña,niña,228076,2887,21.5,-102.2876,302.0
2020,baja california,niña,niña,521693,6753,31.0,-115.5834,5240.0
2020,baja california sur,niña,niña,116305,3387,26.0,-111.6657,1048.0
2020,campeche,niña,niña,141182,2348,20.0,-91.0354,9770.0
2020,coahuila,niña,niña,483649,5450,27.5,-101.9072,336.0
2020,colima,niña,niña,102818,1578,19.7,-103.7242,996.0
2020,chiapas,niña,niña,1038299,7979,15.5,-93.1287,556142.0
2020,chihuahua,niña,niña,559761,7045,28.7,-106.5885,35128.0
2020,ciudad de mexico,niña,niña,1001414,15333,19.2,-99.1329,7152.0
2020,durango,niña,niña,300692,2086,24.5,-104.8526,20550.0
2020,guanajuato,niña,niña,970267,13661,20.5,-101.2582,2980.0
2020,guerrero,niña,niña,613459,48521,17.0,-99.5431,176428.0
2020,hidalgo,niña,niña,474192,6256,19.0,-98.762,70356.0
2020,jalisco,niña,niña,1247796,16755,20.0,-103.349,16724.0
2020,mexico,niña,niña,2475378,34069,18.6,-99.7238,34934.0
2020,michoacan,niña,niña,764140,9509,18.5,-101.7072,38496.0
2020,morelos,niña,niña,279803,4502,18.0,-99.1008,5378.0
2020,nayarit,niña,niña,193697,1206,21.0,-104.8451,26774.0
2020,nuevo leon,niña,niña,814202,10928,25.5,-99.9958,4558.0
2020,oaxaca,niña,niña,681310,30040,16.0,-96.726,282500.0
2020,puebla,niña,niña,1061892,14756,18.0,-98.2059,124936.0
2020,queretaro,niña,niña,346057,4921,20.0,-100.3893,4324.0
2020,quintana roo,niña,niña,267945,6299,18.0,-88.0786,19944.0
2020,san luis potosi,niña,niña,434844,7407,21.5,-100.985,52580.0
2020,sinaloa,niña,niña,443290,5245,24.5,-107.0791,5924.0
2020,sonora,niña,niña,430484,5199,30.0,-110.449,7758.0
2020,tabasco,niña,niña,385000,4831,15.5,-92.6189,17490.0
2020,tamaulipas,niña,niña,515399,4693,24.0,-98.3363,810.0
2020,tlaxcala,niña,niña,207553,2180,18.0,-98.2404,2850.0
2020,veracruz,niña,niña,1173570,25833,18.0,-96.1342,139838.0
2020,yucatan,niña,niña,329117,9134,21.5,-89.0943,57342.0
2020,zacatecas,niña,niña,269301,2013,22.0,-102.5832,1442.0
2015,aguascalientes,niño,niño,236439,0,22.0,-102.2876,498.0
2015,baja california,niño,niño,540500,0,32.5,-116.2834,5180.0
2015,baja california sur,niño,niño,113141,0,24.5,-111.6657,886.0
2015,campeche,niño,niño,147383,0,19.0,-90.5354,11872.0
2015,chiapas,niño,niño,1037046,0,17.5,-93.1287,549766.0
2015,chihuahua,niño,niño,605011,0,30.0,-106.0885,28956.0
2015,coahuila,niño,niño,503966,0,29.0,-101.7072,608.0
2015,colima,niño,niño,114763,0,19.2448,-103.7242,606.0
2015,ciudad de mexico,niño,niño,1092556,0,19.5,-99.1329,7984.0
2015,durango,niño,niño,313459,0,25.5272,-105.0526,17356.0
2015,guanajuato,niño,niño,1027237,0,21.0185,-101.2582,2638.0
2015,guerrero,niño,niño,660939,0,17.6643,-99.5431,191418.0
2015,hidalgo,niño,niño,485425,0,20.0917,-98.762,90034.0
2015,jalisco,niño,niño,1319332,0,20.6603,-103.349,15492.0
2015,mexico,niño,niño,2601628,0,19.5,-99.7238,32214.0
2015,michoacan,niño,niño,796575,0,19.5672,-101.7072,37610.0
2015,morelos,niño,niño,300515,0,18.6818,-99.1008,4906.0
2015,nayarit,niño,niño,204570,0,21.7519,-104.8451,24042.0
2015,nuevo leon,niño,niño,808478,0,26.5917,-99.9958,3908.0
2015,oaxaca,niño,niño,703215,0,17.0738,-96.726,317516.0
2015,puebla,niño,niño,1094735,0,19.0419,-98.2059,154218.0
2015,queretaro,niño,niño,345543,0,20.5887,-100.3893,6330.0
2015,quintana roo,niño,niño,245031,0,19.1821,-87.4786,27974.0
2015,san luis potosi,niño,niño,469458,0,22.0,-100.985,74276.0
2015,sinaloa,niño,niño,489928,0,26.0,-108.4791,7144.0
2015,sonora,niño,niño,474027,0,31.0,-111.9449,9338.0
2015,tabasco,niño,niño,408479,0,17.8409,-92.6189,9270.0
2015,tamaulipas,niño,niño,569757,0,25.0,-97.8363,1674.0
2015,tlaxcala,niño,niño,220960,0,19.3139,-98.2404,3974.0
2015,veracruz,niño,niño,1315138,0,19.1738,-96.1342,175728.0
2015,yucatan,niño,niño,330121,0,22.0,-88.0943,81776.0
2015,zacatecas,niño,niño,280051,0,22.7709,-102.5832,1228.0
2015,aguascalientes,niña,niña,229540,0,21.5,-102.2876,374.0
2015,baja california,niña,niña,525337,0,31.0,-115.5834,7226.0
2015,baja california sur,niña,niña,113239,0,26.0,-111.6657,1010.0
2015,campeche,niña,niña,146266,0,20.0,-91.0354,11406.0
2015,chiapas,niña,niña,1020366,0,15.5,-93.1287,548654.0
2015,chihuahua,niña,niña,589450,0,28.7,-106.5885,30216.0
2015,coahuila,niña,niña,486511,0,27.5,-101.9072,460.0
2015,colima,niña,niña,108602,0,19.7,-103.7242,522.0
2015,ciudad de mexico,niña,niña,1060815,0,19.2,-99.1329,7370.0
2015,durango,niña,niña,304670,0,24.5,-104.8526,17256.0
2015,guanajuato,niña,niña,1003865,0,20.5,-101.2582,2540.0
2015,guerrero,niña,niña,647254,0,17.0,-99.5431,192158.0
2015,hidalgo,niña,niña,472493,0,19.0,-98.762,90126.0
2015,jalisco,niña,niña,1292909,0,20.0,-103.349,15078.0
2015,mexico,niña,niña,2541254,0,18.6,-99.7238,34718.0
2015,michoacan,niña,niña,785277,0,18.5,-101.7072,39956.0
2015,morelos,niña,niña,292574,0,18.0,-99.1008,4628.0
2015,nayarit,niña,niña,195795,0,21.0,-104.8451,23178.0
2015,nuevo leon,niña,niña,785750,0,25.5,-99.9958,4456.0
2015,oaxaca,niña,niña,692039,0,16.0,-96.726,316836.0
2015,puebla,niña,niña,1072210,0,18.0,-98.2059,153696.0
2015,queretaro,niña,niña,332452,0,20.0,-100.3893,6482.0
2015,quintana roo,niña,niña,241599,0,18.0,-88.0786,27950.0
2015,san luis potosi,niña,niña,460845,0,21.5,-100.985,72138.0
2015,sinaloa,niña,niña,472378,0,24.5,-107.0791,6670.0
2015,sonora,niña,niña,461800,0,30.0,-110.449,8660.0
2015,tabasco,niña,niña,397675,0,15.5,-92.6189,10074.0
2015,tamaulipas,niña,niña,548718,0,24.0,-98.3363,1978.0
2015,tlaxcala,niña,niña,214054,0,18.0,-98.2404,4348.0
2015,veracruz,niña,niña,1267383,0,18.0,-96.1342,170790.0
2015,yucatan,niña,niña,322805,0,21.5,-89.0943,77744.0
2015,zacatecas,niña,niña,273080,0,22.0,-102.5832,922.0
2010,aguascalientes,niño,niño,227317,0,22.0,-102.2876,504.0
2010,baja california,niño,niño,549667,0,32.5,-116.2834,7776.0
2010,baja california sur,niño,niño,108567,0,24.5,-111.6657,1714.0
2010,campeche,niño,niño,145925,0,19.0,-90.5354,14086.0
2010,coahuila,niño,niño,486532,0,29.0,-101.7072,1092.0
2010,colima,niño,niño,109770,0,19.2448,-103.7242,960.0
2010,chiapas,niño,niño,995666,0,17.5,-93.1287,516992.0
2010,chihuahua,niño,niño,596991,0,30.0,-106.0885,39314.0
2010,ciudad de mexico,niño,niño,1199088,0,19.5,-99.1329,9974.0
2010,durango,niño,niño,303057,0,25.5272,-105.0526,14296.0
2010,guanajuato,niño,niño,1039154,0,21.0185,-101.2582,4296.0
2010,guerrero,niño,niño,686291,0,17.6643,-99.5431,198394.0
2010,hidalgo,niño,niño,484439,0,20.0917,-98.762,99946.0
2010,jalisco,niño,niño,1303498,0,20.6603,-103.349,15860.0
2010,mexico,niño,niño,2650403,0,19.5,-99.7238,33664.0
2010,michoacan,niño,niño,797828,0,19.5672,-101.7072,39448.0
2010,morelos,niño,niño,303089,0,18.6818,-99.1008,5688.0
2010,nayarit,niño,niño,193938,0,21.7519,-104.8451,21700.0
2010,nuevo leon,niño,niño,763370,0,26.5917,-99.9958,4136.0
2010,oaxaca,niño,niño,728032,0,17.0738,-96.726,357356.0
2010,puebla,niño,niño,1097674,0,19.0419,-98.2059,165634.0
2010,queretaro,niño,niño,333733,0,20.5887,-100.3893,8006.0
2010,quintana roo,niño,niño,232204,0,19.1821,-87.4786,30046.0
2010,san luis potosi,niño,niño,482696,0,22.0,-100.985,85986.0
2010,sinaloa,niño,niño,485559,0,26.0,-108.4791,4052.0
2010,sonora,niño,niño,469206,0,31.0,-111.9449,9506.0
2010,tabasco,niño,niño,409125,0,17.8409,-92.6189,10920.0
2010,tamaulipas,niño,niño,548798,0,25.0,-97.8363,1878.0
2010,tlaxcala,niño,niño,218433,0,19.3139,-98.2404,3460.0
2010,veracruz,niño,niño,1317574,0,19.1738,-96.1342,184272.0
2010,yucatan,niño,niño,329948,0,22.0,-88.0943,90238.0
2010,zacatecas,niño,niño,277607,0,22.7709,-102.5832,1622.0
2010,aguascalientes,niña,niña,221076,0,21.5,-102.2876,426.0
2010,baja california,niña,niña,531384,0,31.0,-115.5834,7566.0
2010,baja california sur,niña,niña,104620,0,26.0,-111.6657,1484.0
2010,campeche,niña,niña,141530,0,20.0,-91.0354,13784.0
2010,coahuila,niña,niña,471255,0,27.5,-101.9072,1066.0
2010,colima,niña,niña,105377,0,19.7,-103.7242,944.0
2010,chiapas,niña,niña,975872,0,15.5,-93.1287,513056.0
2010,chihuahua,niña,niña,579958,0,28.7,-106.5885,39528.0
2010,ciudad de mexico,niña,niña,1164660,0,19.2,-99.1329,10068.0
2010,durango,niña,niña,294038,0,24.5,-104.8526,13750.0
2010,guanajuato,niña,niña,1018197,0,20.5,-101.2582,4154.0
2010,guerrero,niña,niña,672675,0,17.0,-99.5431,199436.0
2010,hidalgo,niña,niña,471819,0,19.0,-98.762,96944.0
2010,jalisco,niña,niña,1264386,0,20.0,-103.349,15280.0
2010,mexico,niña,niña,2586074,0,18.6,-99.7238,33746.0
2010,michoacan,niña,niña,783762,0,18.5,-101.7072,40282.0
2010,morelos,niña,niña,294124,0,18.0,-99.1008,5692.0
2010,nayarit,niña,niña,186777,0,21.0,-104.8451,21524.0
2010,nuevo leon,niña,niña,738455,0,25.5,-99.9958,4574.0
2010,oaxaca,niña,niña,716007,0,16.0,-96.726,357404.0
2010,puebla,niña,niña,1075012,0,18.0,-98.2059,163814.0
2010,queretaro,niña,niña,325343,0,20.0,-100.3893,7894.0
2010,quintana roo,niña,niña,225428,0,18.0,-88.0786,28262.0
2010,san luis potosi,niña,niña,470869,0,21.5,-100.985,83250.0
2010,sinaloa,niña,niña,468920,0,24.5,-107.0791,3976.0
2010,sonora,niña,niña,450388,0,30.0,-110.449,9318.0
2010,tabasco,niña,niña,397543,0,15.5,-92.6189,10236.0
2010,tamaulipas,niña,niña,530871,0,24.0,-98.3363,1846.0
2010,tlaxcala,niña,niña,212509,0,18.0,-98.2404,3518.0
2010,veracruz,niña,niña,1280491,0,18.0,-96.1342,180980.0
2010,yucatan,niña,niña,321561,0,21.5,-89.0943,85418.0
2010,zacatecas,niña,niña,270584,0,22.0,-102.5832,1508.0
2005,yucatan,niño,niño,326767,0,22.0,-88.0943,0.0
2005,yucatan,niña,niña,318351,0,21.5,-89.0943,0.0
2000,aguascalientes,niño,niño,203556,0,22.0,-102.2876,192.0
2000,baja california,niño,niño,450631,0,32.5,-116.2834,9282.0
2000,baja california sur,niño,niño,81694,0,24.5,-111.6657,1050.0
2000,campeche,niño,niño,144820,0,19.0,-90.5354,20102.0
2000,coahuila,niño,niño,447657,0,29.0,-101.7072,418.0
2000,colima,niño,niño,102781,0,19.2448,-103.7242,686.0
2000,chiapas,niño,niño,884581,0,17.5,-93.1287,338884.0
2000,chihuahua,niño,niño,588134,0,30.0,-106.0885,28300.0
2000,ciudad de mexico,niño,niño,1369811,0,19.5,-99.1329,13294.0
2000,durango,niño,niño,309982,0,25.5272,-105.0526,10058.0
2000,guanajuato,niño,niño,1012652,0,21.0185,-101.2582,3000.0
2000,guerrero,niño,niño,708772,0,17.6643,-99.5431,146990.0
2000,hidalgo,niño,niño,474748,0,20.0917,-98.762,108124.0
2000,jalisco,niño,niño,1288327,0,20.6603,-103.349,12092.0
2000,mexico,niño,niño,2508972,0,19.5,-99.7238,45466.0
2000,michoacan,niño,niño,861610,0,19.5672,-101.7072,39532.0
2000,morelos,niño,niño,301613,0,18.6818,-99.1008,6140.0
2000,nayarit,niño,niño,191572,0,21.7519,-104.8451,15102.0
2000,nuevo leon,niño,niño,688595,0,26.5917,-99.9958,1760.0
2000,oaxaca,niño,niño,770331,0,17.0738,-96.726,375500.0
2000,puebla,niño,niño,1074281,0,19.0419,-98.2059,173374.0
2000,queretaro,niño,niño,299126,0,20.5887,-100.3893,8206.0
2000,quintana roo,niño,niño,179742,0,19.1821,-87.4786,35304.0
2000,san luis potosi,niño,niño,499190,0,22.0,-100.985,86424.0
2000,sinaloa,niño,niño,518595,0,26.0,-108.4791,17816.0
2000,sonora,niño,niño,432500,0,31.0,-111.9449,9298.0
2000,tabasco,niño,niño,403653,0,17.8409,-92.6189,15074.0
2000,tamaulipas,niño,niño,518769,0,25.0,-97.8363,1940.0
2000,tlaxcala,niño,niño,202712,0,19.3139,-98.2404,4104.0
2000,veracruz,niño,niño,1407193,0,19.1738,-96.1342,199286.0
2000,yucatan,niño,niño,328395,0,22.0,-88.0943,119532.0
2000,zacatecas,niño,niño,295273,0,22.7709,-102.5832,502.0
2000,aguascalientes,niña,niña,199797,0,21.5,-102.2876,184.0
2000,baja california,niña,niña,434826,0,31.0,-115.5834,9302.0
2000,baja california sur,niña,niña,78295,0,26.0,-111.6657,964.0
2000,campeche,niña,niña,142145,0,20.0,-91.0354,19968.0
2000,coahuila,niña,niña,433608,0,27.5,-101.9072,378.0
2000,colima,niña,niña,98898,0,19.7,-103.7242,538.0
2000,chiapas,niña,niña,870829,0,15.5,-93.1287,336418.0
2000,chihuahua,niña,niña,570511,0,28.7,-106.5885,28290.0
2000,ciudad de mexico,niña,niña,1346106,0,19.2,-99.1329,19058.0
2000,durango,niña,niña,302664,0,24.5,-104.8526,10130.0
2000,guanajuato,niña,niña,1005473,0,20.5,-101.2582,2736.0
2000,guerrero,niña,niña,699026,0,17.0,-99.5431,148258.0
2000,hidalgo,niña,niña,466268,0,19.0,-98.762,104702.0
2000,jalisco,niña,niña,1258917,0,20.0,-103.349,12686.0
2000,mexico,niña,niña,2462403,0,18.6,-99.7238,47780.0
2000,michoacan,niña,niña,856048,0,18.5,-101.7072,40672.0
2000,morelos,niña,niña,295674,0,18.0,-99.1008,6096.0
2000,nayarit,niña,niña,185582,0,21.0,-104.8451,15030.0
2000,nuevo leon,niña,niña,668902,0,25.5,-99.9958,3784.0
2000,oaxaca,niña,niña,759590,0,16.0,-96.726,372998.0
2000,puebla,niña,niña,1058729,0,18.0,-98.2059,169774.0
2000,queretaro,niña,niña,296176,0,20.0,-100.3893,8392.0
2000,quintana roo,niña,niña,173631,0,18.0,-88.0786,33998.0
2000,san luis potosi,niña,niña,490751,0,21.5,-100.985,83640.0
2000,sinaloa,niña,niña,501196,0,24.5,-107.0791,16060.0
2000,sonora,niña,niña,418437,0,30.0,-110.449,8410.0
2000,tabasco,niña,niña,398580,0,15.5,-92.6189,14522.0
2000,tamaulipas,niña,niña,503788,0,24.0,-98.3363,2236.0
2000,tlaxcala,niña,niña,197716,0,18.0,-98.2404,4212.0
2000,veracruz,niña,niña,1374798,0,18.0,-96.1342,193264.0
2000,yucatan,niña,niña,321127,0,21.5,-89.0943,114718.0
2000,zacatecas,niña,niña,290018,0,22.0,-102.5832,478.0
2005,aguascalientes,niño,niño,215214,0,22.0,-102.2876,0.0
2005,baja california,niño,niño,492630,0,32.5,-116.2834,0.0
2005,baja california sur,niño,niño,89288,0,24.5,-111.6657,0.0
2005,campeche,niño,niño,143652,0,19.0,-90.5354,0.0
2005,coahuila,niño,niño,460271,0,29.0,-101.7072,0.0
2005,colima,niño,niño,100652,0,19.2448,-103.7242,0.0
2005,chiapas,niño,niño,926051,0,17.5,-93.1287,0.0
2005,chihuahua,niño,niño,585111,0,30.0,-106.0885,0.0
2005,ciudad de mexico,niño,niño,1256529,0,19.5,-99.1329,0.0
2005,durango,niño,niño,301093,0,25.5272,-105.0526,0.0
2005,guanajuato,niño,niño,987196,0,21.0185,-101.2582,0.0
2005,guerrero,niño,niño,670759,0,17.6643,-99.5431,0.0
2005,hidalgo,niño,niño,454617,0,20.0917,-98.762,0.0
2005,jalisco,niño,niño,1251673,0,20.6603,-103.349,0.0
2005,mexico,niño,niño,2512112,0,19.5,-99.7238,0.0
2005,michoacan,niño,niño,782649,0,19.5672,-101.7072,0.0
2005,morelos,niño,niño,289819,0,18.6818,-99.1008,0.0
2005,nayarit,niño,niño,179858,0,21.7519,-104.8451,0.0
2005,nuevo leon,niño,niño,714521,0,26.5917,-99.9958,0.0
2005,oaxaca,niño,niño,720103,0,17.0738,-96.726,0.0
2005,puebla,niño,niño,1075819,0,19.0419,-98.2059,0.0
2005,queretaro,niño,niño,307750,0,20.5887,-100.3893,0.0
2005,quintana roo,niño,niño,194019,0,19.1821,-87.4786,0.0
2005,san luis potosi,niño,niño,485452,0,22.0,-100.985,0.0
2005,sinaloa,niño,niño,479703,0,26.0,-108.4791,0.0
2005,sonora,niño,niño,435443,0,31.0,-111.9449,0.0
2005,tabasco,niño,niño,386050,0,17.8409,-92.6189,0.0
2005,tamaulipas,niño,niño,531414,0,25.0,-97.8363,0.0
2005,tlaxcala,niño,niño,210203,0,19.3139,-98.2404,0.0
2005,veracruz,niño,niño,1336792,0,19.1738,-96.1342,0.0
2005,zacatecas,niño,niño,272828,0,22.7709,-102.5832,0.0
2005,aguascalientes,niña,niña,209931,0,21.5,-102.2876,0.0
2005,baja california,niña,niña,475210,0,31.0,-115.5834,0.0
2005,baja california sur,niña,niña,85318,0,26.0,-111.6657,0.0
2005,campeche,niña,niña,140425,0,20.0,-91.0354,0.0
2005,coahuila,niña,niña,446368,0,27.5,-101.9072,0.0
2005,colima,niña,niña,96297,0,19.7,-103.7242,0.0
2005,chiapas,niña,niña,907877,0,15.5,-93.1287,0.0
2005,chihuahua,niña,niña,568123,0,28.7,-106.5885,0.0
2005,ciudad de mexico,niña,niña,1222497,0,19.2,-99.1329,0.0
2005,durango,niña,niña,292795,0,24.5,-104.8526,0.0
2005,guanajuato,niña,niña,975591,0,20.5,-101.2582,0.0
2005,guerrero,niña,niña,660743,0,17.0,-99.5431,0.0
2005,hidalgo,niña,niña,445218,0,19.0,-98.762,0.0
2005,jalisco,niña,niña,1218047,0,20.0,-103.349,0.0
2005,mexico,niña,niña,2450436,0,18.6,-99.7238,0.0
2005,michoacan,niña,niña,773414,0,18.5,-101.7072,0.0
2005,morelos,niña,niña,282037,0,18.0,-99.1008,0.0
2005,nayarit,niña,niña,173531,0,21.0,-104.8451,0.0
2005,nuevo leon,niña,niña,691541,0,25.5,-99.9958,0.0
2005,oaxaca,niña,niña,710759,0,16.0,-96.726,0.0
2005,puebla,niña,niña,1056246,0,18.0,-98.2059,0.0
2005,queretaro,niña,niña,302665,0,20.0,-100.3893,0.0
2005,quintana roo,niña,niña,187832,0,18.0,-88.0786,0.0
2005,san luis potosi,niña,niña,475796,0,21.5,-100.985,0.0
2005,sinaloa,niña,niña,462271,0,24.5,-107.0791,0.0
2005,sonora,niña,niña,419348,0,30.0,-110.449,0.0
2005,tabasco,niña,niña,377638,0,15.5,-92.6189,0.0
2005,tamaulipas,niña,niña,514304,0,24.0,-98.3363,0.0
2005,tlaxcala,niña,niña,203796,0,18.0,-98.2404,0.0
2005,veracruz,niña,niña,1299892,0,18.0,-96.1342,0.0
2005,zacatecas,niña,niña,267281,0,22.0,-102.5832,0.0
`;

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
            datos = getDataArray(datos,"map")
        }catch(e){
            console.error("No fue posible obtener y transformar los datos",e)
        }


        /******************************************************************************************************************* */
        // Ordenamos datos
        /******************************************************************************************************************* */

        try{
            datos = orderDataByColumn(datos, "Total", true);   //Descendente
        }catch(e){
            console.erro("No fue posible aplicar el ordenamiento a los datos",e)
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

        try{
            drawRepublic(bbox,ctxRep);
        }
        catch(e){
            console.error("No fue posible definir el mapa de la republica",e)
        }
        
        //*********************************************************************************************************************
        // Draw bubbles
        //*********************************************************************************************************************
        
        try{
            drawBubbles(ctx,ctxRef,ctxRefB,bbox,datos,"pink","white",2015,radioState);
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

    drawBubbles(ctx, ctxRef,ctxRefB, bbox, datos, "pink", "white", selectedYear, radioState);
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
        afrodescendiente: document.getElementById('afrodescendiente').checked,
        general: document.getElementById('general').checked,
        indigena: document.getElementById('indigena').checked
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



