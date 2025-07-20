const countyTownFeeMap = {
  "Nairobi County": {
    "CBD": 150,
    "Westlands": 150,
    "Eastleigh": 150,
    "South B": 150,
  },
  "Kajiado County": {
    "Kajiado": 200,
    "Ngong": 100,
    "Kitengela": 150,
    "Ongata Rongai": 100
  },
  "Kiambu County": {
    "Kiambu": 200,
    "Ruiru": 200,
    "Thika": 200,
    "Limuru": 200
  },
  "Machakos County": {
    "Machakos": 250,
    "Mwala": 250,
    "Kangundo": 250,
    "Matuu": 250
  },
  "Narok County": {
    "Narok": 300,
    "Kilgoris": 300,
    "Ololulunga": 300,
    "Suswa": 300
  },
  "Murang'a County": {
    "Murang'a": 300,
    "Kangema": 300,
    "Kigumo": 300,
    "Maragua": 300
  },
  "Kirinyaga County": {
    "Kerugoya": 300,
    "Kutus": 300,
    "Mwea": 300,
    "Kianyaga": 300
  },
  "Embu County": {
    "Embu": 300,
    "Runyenjes": 300,
    "Siakago": 300,
    "Kiritiri": 300
  },
  "Tharaka Nithi County": {
    "Chuka": 350,
    "Marimanti": 350,
    "Kathwana": 350,
    "Mitheru": 350
  },
  "Meru County": {
    "Meru": 400,
    "Maua": 400,
    "Timau": 400,
    "Nkubu": 400
  },
  "Nyeri County": {
    "Nyeri Town": 300,
    "Othaya": 300,
    "Karatina": 300,
    "Mukurweini": 300
  },
  "Mombasa County": {
    "Mombasa": 650,
    "Changamwe": 650,
    "Likoni": 650,
    "Kisauni": 650
  },
  "Kwale County": {
    "Kwale": 650,
    "Ukunda": 650,
    "Msambweni": 650,
    "Kinango": 650
  },
  "Taita Taveta County": {
    "Voi": 550,
    "Taveta": 550,
    "Mwatate": 550,
    "Wundanyi": 550
  },
  "Kilifi County": {
    "Kilifi": 650,
    "Malindi": 650,
    "Mtwapa": 650,
    "Kaloleni": 650
  },
  "Lamu County": {
    "Lamu": 700,
    "Mokowe": 700,
    "Hindi": 700,
    "Mpeketoni": 700
  },
  "Tana River County": {
    "Hola": 600,
    "Garsen": 600,
    "Bura": 600,
    "Kipini": 600
  },
  "Garissa County": {
    "Garissa": 700,
    "Madogo": 700,
    "Ijara": 700,
    "Dadaab": 700
  },
  "Wajir County": {
    "Wajir": 800,
    "Habaswein": 800,
    "Eldas": 800,
    "Tarbaj": 800
  },
  "Mandera County": {
    "Mandera": 1000,
    "Elwak": 1000,
    "Rhamu": 1000,
    "Takaba": 1000
  },
  "Isiolo County": {
    "Isiolo": 600,
    "Kipsing": 600,
    "Garbatulla": 600,
    "Merti": 600
  },
  "Marsabit County": {
    "Marsabit": 950,
    "Moyale": 950,
    "Sololo": 950,
    "North Horr": 950
  },
  "Samburu County": {
    "Maralal": 750,
    "Baragoi": 750,
    "Wamba": 750,
    "Suguta Marmar": 750
  },
  "Laikipia County": {
    "Nanyuki": 400,
    "Nyahururu": 400,
    "Rumuruti": 400,
    "Doldol": 400
  },
  "Nyandarua County": {
    "Ol Kalou": 350,
    "Njabini": 350,
    "Engineer": 350,
    "Kinangop": 350
  },
  "Baringo County": {
    "Kabarnet": 600,
    "Eldama Ravine": 600,
    "Mogotio": 600,
    "Marigat": 600
  },
  "Nakuru County": {
    "Nakuru": 400,
    "Naivasha": 400,
    "Gilgil": 400,
    "Molo": 400
  },
  "Kericho County": {
    "Kericho": 450,
    "Litein": 450,
    "Kipkelion": 450,
    "Ainamoi": 450
  },
  "Bomet County": {
    "Bomet": 500,
    "Sotik": 500,
    "Chepalungu": 500,
    "Longisa": 500
  },
  "Uasin Gishu County": {
    "Eldoret": 500,
    "Moi's Bridge": 500,
    "Ziwa": 500,
    "Turbo": 500
  },
  "Elgeyo Marakwet County": {
    "Iten": 500,
    "Tambach": 500,
    "Kapsowar": 500,
    "Chepkorio": 500
  },
  "Nandi County": {
    "Kapsabet": 500,
    "Nandi Hills": 500,
    "Mosoriot": 500,
    "Kabiyet": 500
  },
  "Trans Nzoia County": {
    "Kitale": 550,
    "Endebess": 550,
    "Kiminini": 550,
    "Saboti": 550
  },
  "West Pokot County": {
    "Kapenguria": 600,
    "Chepareria": 600,
    "Kacheliba": 600,
    "Ortum": 600
  },
  "Bungoma County": {
    "Bungoma": 550,
    "Kimilili": 550,
    "Webuye": 550,
    "Chwele": 550
  },
  "Busia County": {
    "Busia": 600,
    "Nambale": 600,
    "Malaba": 600,
    "Matayos": 600
  },
  "Siaya County": {
    "Siaya": 600,
    "Bondo": 600,
    "Ugunja": 600,
    "Gem": 600
  },
  "Kisumu County": {
    "Kisumu": 600,
    "Ahero": 600,
    "Maseno": 600,
    "Muhoroni": 600
  },
  "Homa Bay County": {
    "Homa Bay": 650,
    "Mbita": 650,
    "Oyugis": 650,
    "Ndhiwa": 650
  },
  "Migori County": {
    "Migori": 650,
    "Awendo": 650,
    "Rongo": 650,
    "Kehancha": 650
  },
  "Kisii County": {
    "Kisii": 600,
    "Nyamira": 600,
    "Suneka": 600,
    "Masimba": 600
  },
  "Nyamira County": {
    "Nyamira": 600,
    "Keroka": 600,
    "Manga": 600,
    "Nyansiongo": 600
  },
  "Makueni County": {
    "Wote": 500,
    "Makindu": 500,
    "Emali": 500,
    "Kibwezi": 500
  },
  "Kitui County": {
    "Kitui": 500,
    "Mwingi": 500,
    "Mutomo": 500,
    "Kanziko": 500
  }
};

export default countyTownFeeMap;