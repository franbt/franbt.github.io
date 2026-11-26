// Datos oficiales de las 13 Rutas Turísticas de Cáceres (Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres)
const ROUTES_DATA = [
  {
    "id": "ruta-1",
    "slug": "primeros-pobladores-ribera",
    "file": "routes/ruta-01-primeros-pobladores.html",
    "pdf": "routes/RUTAS/Ruta_Los_primeros_pobladores_de_la_Ribera.pdf",
    "nombre": "1. Los primeros pobladores en la Ribera",
    "eslogan": "De la Vía de la Plata a las pinturas paleolíticas de Maltravieso junto a la Ribera del Marco",
    "tematica": "Patrimonio, Ecoturismo, Arqueología y Prehistoria",
    "descripcion": "Recorrido por el eje sur de Cáceres que enlaza la calzada romana de la Vía de la Plata, el corredor ecoturístico de la Ribera del Marco y los yacimientos prehistóricos del Calerizo cacereño. Desde hace más de 500.000 años, distintas culturas se asentaron junto a esta corriente continua de agua procedente de la Fuente del Rey.",
    "publico": "Público general, familias, centros educativos, aficionados a la arqueología, prehistoria y ecoturismo urbano.",
    "duracion": "2 horas y 30 minutos",
    "distancia": "4,5 km",
    "dificultad": "Baja (Urbana y corredor peatonal)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Accesible (PMR) en la mayor parte del recorrido urbano y corredor de la Ribera; acceso al Centro de Interpretación de Maltravieso adaptado.",
    "inicio_final": "Inicio en Ronda de San Francisco (Vía de la Plata) / Final en Cueva del Conejar y entorno de Maltravieso",
    "numero_paradas": 6,
    "bg_gradient": "linear-gradient(135deg, #9a3412 0%, #3f6212 100%)",
    "mapa": {
      "viewBox": "0 0 840 360",
      "svgPath": "M 95,187 C 160,187 160,244 225,244 C 290,244 290,233 355,233 C 420,233 420,168 485,168 C 550,168 550,126 615,126 C 680,126 680,156 745,156",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 187,
          "name": "Ronda de San Francisco…",
          "label_y": 153
        },
        {
          "num": 2,
          "x": 225,
          "y": 244,
          "name": "Iglesia–Convento de Sa…",
          "label_y": 288
        },
        {
          "num": 3,
          "x": 355,
          "y": 233,
          "name": "La Ribera del Marco",
          "label_y": 199
        },
        {
          "num": 4,
          "x": 485,
          "y": 168,
          "name": "Iglesia del Espíritu S…",
          "label_y": 212
        },
        {
          "num": 5,
          "x": 615,
          "y": 126,
          "name": "Cueva de Maltravieso",
          "label_y": 92
        },
        {
          "num": 6,
          "x": 745,
          "y": 156,
          "name": "Cueva del Conejar y Cu…",
          "label_y": 200
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Ronda de San Francisco. La Vía de la Plata",
        "tiempo": "00:00 - 00:20",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Histórica calzada romana que unía Emerita Augusta (Mérida) con Astúrica Augusta (Astorga), convertida después en ruta de peregrinación hacia Santiago."
      },
      {
        "parada": 2,
        "titulo": "Iglesia – Convento de San Francisco",
        "tiempo": "00:25 - 00:45",
        "distancia_tramo": "0,5 km",
        "descripcion": "Complejo monumental de gran versatilidad histórica hoy convertido en centro cultural, de congresos y exposiciones."
      },
      {
        "parada": 3,
        "titulo": "La Ribera del Marco – Corredor Ecoturístico",
        "tiempo": "00:55 - 01:25",
        "distancia_tramo": "1,2 km",
        "descripcion": "Arroyo natural de más de 7 km alimentado por la Fuente del Rey que ha dado vida a huertas, molinos, fuentes, acequias y puentes desde la Antigüedad."
      },
      {
        "parada": 4,
        "titulo": "Iglesia del Espíritu Santo",
        "tiempo": "01:30 - 01:45",
        "distancia_tramo": "0,7 km",
        "descripcion": "Antigua ermita y hospital ocasional, hoy parroquia, ejemplo destacado de arquitectura mudéjar en Cáceres."
      },
      {
        "parada": 5,
        "titulo": "Cueva de Maltravieso – Centro de Interpretación",
        "tiempo": "01:55 - 02:15",
        "distancia_tramo": "1,1 km",
        "descripcion": "Cavidad de 150 metros en pleno casco urbano con uso humano desde hace más de 500.000 años hasta la Edad del Bronce y célebre arte rupestre paleolítico."
      },
      {
        "parada": 6,
        "titulo": "Cueva del Conejar y Cueva Santa Ana",
        "tiempo": "02:20 - 02:30",
        "distancia_tramo": "1,0 km (Final)",
        "descripcion": "Yacimientos prehistóricos del Calerizo que documentan la transición de cazadores-recolectores a agricultores y ocupaciones de hasta 800.000 años."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Ronda de San Francisco · Vía de la Plata",
        "tiempo_parada": "20 min",
        "claves": "La Vía Lata, bautizada por los árabes como Vía de la Plata, fue eje comercial, cultural, militar y religioso. Norba Caesarina fue uno de sus puntos clave y su lienzo occidental limitaba con la calzada entre los muros y la Ribera del Marco.",
        "audio_texto": "Iniciamos la ruta en la Ronda de San Francisco, sobre el trazado de la histórica Vía de la Plata. Durante la dominación romana unía Mérida con Astorga y, durante las obras de repavimentación en esta entrada sur de Cáceres, aparecieron grandes secciones de la calzada romana que aún se conservan en el subsuelo.",
        "curiosidad": "La calzada también pasaba por el antiguo campamento romano de Castra Caecilia y conserva tramos originales bajo el pavimento de la Ronda de San Francisco."
      },
      {
        "num": 2,
        "nombre": "Iglesia–Convento de San Francisco",
        "tiempo_parada": "20 min",
        "claves": "Albergó el Colegio de Teología Escolástica, biblioteca histórica, cuartel y caballerizas, hospital provincial, casa de misericordia y colegio-residencia de huérfanos. Cuenta con gran iglesia-auditorio, cuatro salas y cuatro claustros.",
        "audio_texto": "Ante nosotros se alza el histórico conjunto de la Iglesia y Convento de San Francisco, que ha sido desde colegio teológico y hospital provincial hasta cuartel en tiempos de guerra. Hoy sus cuatro claustros e iglesia-auditorio acogen conciertos, teatro y congresos.",
        "curiosidad": "Sus cuatro claustros y espacios monumentales constituyen uno de los complejos culturales más amplios de la provincia."
      },
      {
        "num": 3,
        "nombre": "La Ribera del Marco",
        "tiempo_parada": "30 min",
        "claves": "La Ordenanza del agua de la Ribera (Reyes Católicos, 1 de enero de 1494) regula una comunidad de regantes que regaba una franja de 6,8 km y unas 33 hectáreas de huertos. Se han hallado semillas y utensilios neolíticos de unos 8.000 años a. C.",
        "audio_texto": "Cáceres es una ciudad sin río, pero la Ribera del Marco cumple esa función desde hace milenios. Sus aguas sostuvieron molinos, curtidores, hortelanos y una de las comunidades de regantes más antiguas de España.",
        "curiosidad": "El hallazgo reciente de semillas y utensilios neolíticos de hacia el 8.000 a. C. demuestra una ocupación humana ininterrumpida junto a este arroyo."
      },
      {
        "num": 4,
        "nombre": "Iglesia del Espíritu Santo",
        "tiempo_parada": "15 min",
        "claves": "Sus elementos constructivos más antiguos pertenecen al siglo XIV, conservando la sobriedad y los rasgos característicos del mudéjar cacereño en ladrillo y mampostería.",
        "audio_texto": "La Iglesia del Espíritu Santo nació como ermita y hospital ocasional junto al camino. Sus muros del siglo XIV la convierten en uno de los mejores testimonios de arquitectura mudéjar de la ciudad.",
        "curiosidad": "Sirvió históricamente como refugio hospitalario para viajeros y peregrinos que entraban por el sur de la villa."
      },
      {
        "num": 5,
        "nombre": "Cueva de Maltravieso",
        "tiempo_parada": "20 min",
        "claves": "Alberga 71 siluetas de manos pintadas en negativo con pigmento ocre rojo (entre 15.000 y 25.000 años), muchas con el dedo meñique incompleto. Descubierta en 1951 tras una voladura en el Calerizo e investigada por Carlos Callejo. Horario Centro: Martes a sábado 9:00-14:30; domingos 10:15-14:30.",
        "audio_texto": "Llegamos a la Cueva de Maltravieso, la estación arqueológica con mayor número de manos pintadas de todos los yacimientos prehistóricos hallados hasta el momento en Europa. En 1951, una explosión de cantera dejó al descubierto sus galerías y el historiador Carlos Callejo dio a conocer sus pinturas.",
        "curiosidad": "Las 71 manos pintadas en negativo en ocre rojo representan mano, muñeca y antebrazo, y muestran de forma recurrente el dedo meñique incompleto."
      },
      {
        "num": 6,
        "nombre": "Cueva del Conejar y Cueva Santa Ana",
        "tiempo_parada": "15 min",
        "claves": "En la Cueva del Conejar se recuperaron herramientas en cuarzo y sílex, cerámica neolítica, calcolítica y del Bronce, y el primer molar derecho de un ser humano de hace 5.000 años. La Cueva de Santa Ana (campamento militar) conserva herramientas paleolíticas de hace 800.000 años.",
        "audio_texto": "Cerramos la ruta en las cuevas del Conejar y Santa Ana, cuyos hallazgos de hace hasta 800.000 años convierten a Cáceres en uno de los espacios culturales más antiguos de la Península Ibérica.",
        "curiosidad": "En el Conejar se halló el primer molar humano de un habitante del Calerizo de hace 5.000 años, clave para estudiar la transición al Neolítico."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🏛️",
        "nombre": "Centro de Interpretación Maltravieso",
        "desc": "Martes a sábado de 9:00 a 14:30 h; domingos de 10:15 a 14:30 h."
      },
      {
        "icono": "🅿️",
        "nombre": "Aparcamientos",
        "desc": "Zonas de aparcamiento en Ronda de San Francisco y entorno del Parque del Rodeo."
      },
      {
        "icono": "🚌",
        "nombre": "Transporte urbano",
        "desc": "Paradas de autobús urbano a lo largo de la Ronda de San Francisco y Avda. de la Hispanidad."
      },
      {
        "icono": "🚰",
        "nombre": "Corredor verde y descanso",
        "desc": "Bancos, fuentes y sombra en el corredor ecoturístico de la Ribera del Marco."
      }
    ],
    "recomendaciones": [
      "Consultar el horario del Centro de Interpretación de la Cueva de Maltravieso antes de iniciar la ruta (lunes cerrado).",
      "Llevar calzado cómodo adecuado para alternar acera urbana y sendero de tierra compactada en la Ribera.",
      "Llevar agua y protección solar, especialmente en los tramos abiertos hacia Maltravieso y Vistahermosa."
    ],
    "sostenibilidad": [
      "Recorrido 100% peatonal que pone en valor el corredor ecológico de la Ribera del Marco.",
      "Respeto estricto a los yacimientos arqueológicos del Calerizo y a la flora riparia del arroyo.",
      "Fomento del transporte público urbano y turismo cultural desestacionalizado."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-2",
    "slug": "colonia-romana-norba-caesarina",
    "file": "routes/ruta-02-norba-caesarina.html",
    "pdf": "routes/RUTAS/Ruta_La_villa_romana_Norba_Caesarina.pdf",
    "nombre": "2. La colonia romana \"Norba Caesarina\"",
    "eslogan": "Las huellas de Roma bajo la ciudad monumental: campamentos, murallas, foro y Vía de la Plata",
    "tematica": "Patrimonio, Historia Romana y Arqueología",
    "descripcion": "Itinerario por el origen romano de Cáceres, nacida a partir de los campamentos militares de Castra Caecilia y Castra Servilia y fundada como colonia Norba Caesarina entre los años 35 y 20 a. C. en la Lusitania. Descubre sillares originales, la única puerta romana conservada, restos termales y la conexión con la Ruta de la Plata.",
    "publico": "Amantes de la historia antigua, estudiantes, visitantes culturales y familias.",
    "duracion": "2 horas",
    "distancia": "2,4 km",
    "dificultad": "Baja (Urbana con cuestas moderadas)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Parcialmente accesible - Pavimento empedrado en la Ciudad Monumental; pendientes en el Arco del Cristo y acceso al Baluarte.",
    "inicio_final": "Inicio en Ronda de San Francisco / Vía de la Plata · Final en Iglesia de Santiago (extensión opcional a Castra Caecilia)",
    "numero_paradas": 7,
    "bg_gradient": "linear-gradient(135deg, #991b1b 0%, #b45309 100%)",
    "mapa": {
      "viewBox": "0 0 840 360",
      "svgPath": "M 95,187 C 149,187 149,244 203,244 C 258,244 258,233 312,233 C 366,233 366,168 420,168 C 474,168 474,126 528,126 C 582,126 582,156 637,156 C 691,156 691,223 745,223",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 187,
          "name": "Cáceres Romana y Vía d…",
          "label_y": 153
        },
        {
          "num": 2,
          "x": 203,
          "y": 244,
          "name": "Baluarte de los Pozos…",
          "label_y": 288
        },
        {
          "num": 3,
          "x": 312,
          "y": 233,
          "name": "Arco del Cristo",
          "label_y": 199
        },
        {
          "num": 4,
          "x": 420,
          "y": 168,
          "name": "Palacio de Mayoralgo",
          "label_y": 212
        },
        {
          "num": 5,
          "x": 528,
          "y": 126,
          "name": "Torre de Bujaco",
          "label_y": 92
        },
        {
          "num": 6,
          "x": 637,
          "y": 156,
          "name": "Barbacana del Arco del…",
          "label_y": 200
        },
        {
          "num": 7,
          "x": 745,
          "y": 223,
          "name": "Iglesia de Santiago",
          "label_y": 189
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Cáceres Romana y La Vía de la Plata",
        "tiempo": "00:00 - 00:20",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Origen de Norba Caesarina como una de las cinco colonias romanas de la Lusitania, vinculada a Castra Caecilia, Castra Servilia y la Ruta de la Plata."
      },
      {
        "parada": 2,
        "titulo": "Baluarte de los Pozos y La Cisterna de San Roque",
        "tiempo": "00:25 - 00:40",
        "distancia_tramo": "0,4 km",
        "descripcion": "Conjunto defensivo hidráulico que protegía el abastecimiento de agua de la ciudad, con sillares romanos reutilizados en su bóveda."
      },
      {
        "parada": 3,
        "titulo": "Arco del Cristo (Puerta del Río)",
        "tiempo": "00:45 - 01:00",
        "distancia_tramo": "0,3 km",
        "descripcion": "Única puerta romana original que se conserva de las cuatro que tuvo la muralla de Norba Caesarina."
      },
      {
        "parada": 4,
        "titulo": "Palacio de Mayoralgo y restos del Foro",
        "tiempo": "01:05 - 01:25",
        "distancia_tramo": "0,5 km",
        "descripcion": "Mansión señorial de los siglos XV-XVI bajo la cual las excavaciones revelaron el foro, las termas (Frigidarium) y las primeras viviendas de Norba Caesarina."
      },
      {
        "parada": 5,
        "titulo": "Torre de Bujaco – Centro de Interpretación de las Tres Culturas",
        "tiempo": "01:30 - 01:45",
        "distancia_tramo": "0,4 km",
        "descripcion": "Torre albarrana de 25 m (siglo XII) cuyo basamento, como el de las torres de la Yerba, del Horno y del Aver, es de origen romano."
      },
      {
        "parada": 6,
        "titulo": "Barbacana del Arco del Socorro",
        "tiempo": "01:50 - 01:55",
        "distancia_tramo": "0,4 km",
        "descripcion": "Pequeño lienzo defensivo adelantado a la muralla principal donde se conservan restos de la fábrica romana original."
      },
      {
        "parada": 7,
        "titulo": "Iglesia de Santiago",
        "tiempo": "01:55 - 02:10",
        "distancia_tramo": "0,4 km (Final)",
        "descripcion": "Templo extramuros vinculado al Camino de Santiago de la Vía de la Plata, con portadas góticas con alfiz y retablo mayor de Alonso de Berruguete."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Cáceres Romana y Vía de la Plata",
        "tiempo_parada": "20 min",
        "claves": "Fundada entre el 35 y 20 a. C., tras las guerras lusitanas contra Viriato (150-139 a. C.). El lienzo occidental de la muralla lindaba con la Vía de la Plata entre los muros y la Ribera del Marco.",
        "audio_texto": "Los orígenes romanos de Cáceres se remontan a dos campamentos militares: Castra Caecilia, hoy Cáceres el Viejo, y Castra Servilia. Entre los años 35 y 20 antes de Cristo se fundó aquí Norba Caesarina, una de las cinco colonias del Imperio Romano en la Lusitania.",
        "curiosidad": "A 2,5 km por la carretera de Torrejón el Rubio puede visitarse el Centro de Interpretación del Campamento Romano Cáceres el Viejo (Castra Caecilia, ca. 80 a. C.)."
      },
      {
        "num": 2,
        "nombre": "Baluarte de los Pozos y Cisterna",
        "tiempo_parada": "15 min",
        "claves": "La Cisterna de San Roque podía almacenar hasta 130 m³ de agua incluso en sequía; desde el exterior se distinguen sillares romanos reutilizados en la obra defensiva.",
        "audio_texto": "Este conjunto defensivo garantizaba el acceso seguro al agua. En la Cisterna de San Roque, capaz de almacenar hasta ciento treinta metros cúbicos, aún se distinguen grandes sillares romanos reutilizados.",
        "curiosidad": "Su gran capacidad permitía resistir largos asedios y periodos de estiaje sin depender de fuentes externas."
      },
      {
        "num": 3,
        "nombre": "Arco del Cristo",
        "tiempo_parada": "15 min",
        "claves": "Conocida también como Puerta del Río, construida en el siglo I con sillares de granito a soga y tizón. Comunica la Judería Vieja y la Cuesta del Marqués con la Ribera del Marco.",
        "audio_texto": "El Arco del Cristo o Puerta del Río es la única de las cuatro puertas romanas originales que ha llegado hasta nosotros, dando salida directa hacia el cauce de la Ribera del Marco.",
        "curiosidad": "Da acceso a la Cuesta del Marqués y la Judería Vieja, uno de los rincones más fotografiados de la ciudad."
      },
      {
        "num": 4,
        "nombre": "Palacio de Mayoralgo",
        "tiempo_parada": "20 min",
        "claves": "En su subsuelo se hallaron el foro de la colonia, restos termales como el Frigidarium, un aljibe, muros y un busto de bronce recubierto de oro. La fachada principal fue reformada tras una bomba en 1937.",
        "audio_texto": "Bajo el Palacio de Mayoralgo se demostró arqueológicamente que Norba Caesarina ocupaba el actual recinto amurallado. Allí aparecieron el foro, un edificio termal con su frigidarium y un busto de bronce dorado.",
        "curiosidad": "El palacio fundó uno de los mayorazgos más antiguos de España y conserva un pequeño arco-puente conectado a la muralla."
      },
      {
        "num": 5,
        "nombre": "Torre de Bujaco",
        "tiempo_parada": "15 min",
        "claves": "Alberga el Centro de Interpretación de las Tres Culturas y permite recorrer un tramo de adarve. Horario: L-D 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno).",
        "audio_texto": "Aunque la Torre de Bujaco es obra almohade del siglo XII, descansa sobre cimientos romanos, al igual que las torres de la Yerba, del Horno y del Aver. Desde su interior se recorre el adarve defensivo.",
        "curiosidad": "En el siglo XVI se le añadió el característico balconcillo renacentista que mira hacia la Plaza Mayor."
      },
      {
        "num": 6,
        "nombre": "Barbacana del Arco del Socorro",
        "tiempo_parada": "10 min",
        "claves": "Una barbacana actuaba como primera línea de protección a pocos metros de la muralla principal; aquí pervive parte de la muralla de época romana.",
        "audio_texto": "La barbacana del Arco del Socorro conserva visible la superposición histórica de la muralla, manteniendo tramos originales de época romana delante del recinto principal.",
        "curiosidad": "Este sector protegía uno de los accesos norte hacia la antigua Puerta de Coria y el barrio de Santiago."
      },
      {
        "num": 7,
        "nombre": "Iglesia de Santiago",
        "tiempo_parada": "15 min",
        "claves": "Nave única con bóvedas de crucería; retablo mayor encargado en 1557 a Alonso de Berruguete e instalado en 1570. También alberga el Cristo de los Milagros (s. XV) y Jesús Nazareno (1609, Tomás de la Huerta).",
        "audio_texto": "Concluimos en la Iglesia de Santiago, ligada históricamente a los peregrinos de la Vía de la Plata. Sobre su puerta trasera se distingue un escudo con la talla de un peregrino y en su interior brilla el retablo mayor de Alonso de Berruguete.",
        "curiosidad": "Como complemento fuera del casco urbano puede visitarse el Centro de Interpretación Cáceres el Viejo (Ctra. Torrejón el Rubio km 2,5; tel. 927 006 988)."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "ℹ️",
        "nombre": "Centro de Interpretación Tres Culturas",
        "desc": "En la Torre de Bujaco. Lunes a domingo: 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno)."
      },
      {
        "icono": "🏕️",
        "nombre": "Campamento Romano Cáceres el Viejo",
        "desc": "Ctra. Torrejón el Rubio, km 2,5 · Tel. 927 006 988 · L-D 10:00-14:00 y 17:00-20:00 (verano) / 16:00-19:00 (invierno)."
      },
      {
        "icono": "🚻",
        "nombre": "Servicios y restauración",
        "desc": "Oficina de Turismo en Plaza Mayor y amplia oferta hostelera en el entorno."
      }
    ],
    "recomendaciones": [
      "Calzado cómodo con suela antideslizante para los adoquines y cuestas del Conjunto Monumental.",
      "Combinar la visita urbana con el Centro de Interpretación de Cáceres el Viejo para una visión completa de Castra Caecilia.",
      "Consultar los horarios de apertura de la Torre de Bujaco e Iglesia de Santiago."
    ],
    "sostenibilidad": [
      "Recorrido peatonal de cero emisiones por el Conjunto Monumental Patrimonio de la Humanidad.",
      "Apoyo al comercio local y divulgación responsable del patrimonio arqueológico."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-3",
    "slug": "ciudad-almohade-hizn-qazris",
    "file": "routes/ruta-03-hizn-qazris.html",
    "pdf": "routes/RUTAS/Ruta_La_ciudad_almohade_Hinz_Qazris.pdf",
    "nombre": "3. Ruta por la ciudad almohade \"Hizn Qazris\"",
    "eslogan": "Murallas de tapial, torres albarranas y el gran aljibe hispano-árabe de la Cáceres del siglo XII",
    "tematica": "Patrimonio, Arquitectura Almohade y Historia Andalusí",
    "descripcion": "En 1147 Abd al-Mumin refundó la ciudad sobre los restos hispanorromanos y visigodos. En el siglo XII, ante el avance cristiano, Hizn Qazris se fortificó con una poderosa muralla de tapial y torres albarranas hasta su conquista definitiva por Alfonso IX de León el 23 de abril de 1229, día de San Jorge.",
    "publico": "Público general, aficionados a la arquitectura militar medieval, historia andalusí y turismo cultural.",
    "duracion": "2 horas y 30 minutos",
    "distancia": "2,6 km",
    "dificultad": "Media-Baja (Casco histórico con desniveles)",
    "dificultad_class": "diff-media",
    "accesibilidad": "Parcialmente accesible - Tramos con pendientes y escalones en la Judería Vieja y el entorno del Arco del Cristo.",
    "inicio_final": "Inicio en La Muralla y Torre del Horno / Final en Torre de la Yerba (Plaza Mayor)",
    "numero_paradas": 13,
    "bg_gradient": "linear-gradient(135deg, #0f766e 0%, #1e3a5f 100%)",
    "mapa": {
      "viewBox": "0 0 1280 400",
      "svgPath": "M 95,208 C 140,208 140,265 186,265 C 232,265 232,254 277,254 C 322,254 322,189 368,189 C 413,189 413,146 458,146 C 504,146 504,176 549,176 C 594,176 594,244 640,244 C 686,244 686,269 731,269 C 776,269 776,222 822,222 C 867,222 867,158 912,158 C 958,158 958,154 1003,154 C 1048,154 1048,213 1094,213 C 1140,213 1140,267 1185,267",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 208,
          "name": "La Muralla y Torre del…",
          "label_y": 174
        },
        {
          "num": 2,
          "x": 186,
          "y": 265,
          "name": "Torre del Postigo y Ar…",
          "label_y": 309
        },
        {
          "num": 3,
          "x": 277,
          "y": 254,
          "name": "Torre del Aver",
          "label_y": 220
        },
        {
          "num": 4,
          "x": 368,
          "y": 189,
          "name": "Casa Mudéjar",
          "label_y": 233
        },
        {
          "num": 5,
          "x": 458,
          "y": 146,
          "name": "Aljibe Árabe · Museo d…",
          "label_y": 112
        },
        {
          "num": 6,
          "x": 549,
          "y": 176,
          "name": "Torre Albarrana y Oliv…",
          "label_y": 220
        },
        {
          "num": 7,
          "x": 640,
          "y": 244,
          "name": "Torre Mochada",
          "label_y": 210
        },
        {
          "num": 8,
          "x": 731,
          "y": 269,
          "name": "Torre de Mérida Este",
          "label_y": 313
        },
        {
          "num": 9,
          "x": 822,
          "y": 222,
          "name": "Baluarte de los Pozos",
          "label_y": 188
        },
        {
          "num": 10,
          "x": 912,
          "y": 158,
          "name": "La Muralla Árabe",
          "label_y": 202
        },
        {
          "num": 11,
          "x": 1003,
          "y": 154,
          "name": "Arco del Cristo y Puer…",
          "label_y": 120
        },
        {
          "num": 12,
          "x": 1094,
          "y": 213,
          "name": "Casa-Museo Árabe Yusuf…",
          "label_y": 257
        },
        {
          "num": 13,
          "x": 1185,
          "y": 267,
          "name": "Torre de la Yerba",
          "label_y": 233
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "La Muralla y la Torre del Horno",
        "tiempo": "00:00 - 00:12",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Lienzo defensivo de origen romano reconstruido por los almohades con mampostería y tapial de tierra prensada."
      },
      {
        "parada": 2,
        "titulo": "Torre del Postigo y Arco de Santa Ana",
        "tiempo": "00:15 - 00:25",
        "distancia_tramo": "0,2 km",
        "descripcion": "Postigo abierto por necesidad de paso entre puertas principales, con apariencia actual del siglo XVIII y bóvedas de rosca de ladrillo."
      },
      {
        "parada": 3,
        "titulo": "Torre del Aver (o Torre Redonda)",
        "tiempo": "00:28 - 00:36",
        "distancia_tramo": "0,2 km",
        "descripcion": "Torre defensiva en el ángulo suroeste de la muralla con basamento romano y recrecimiento almohade."
      },
      {
        "parada": 4,
        "titulo": "Casa Mudéjar (Cuesta de Aldana)",
        "tiempo": "00:40 - 00:50",
        "distancia_tramo": "0,2 km",
        "descripcion": "Edificio civil del siglo XIV y uno de los escasos testimonios del arte mudéjar en Cáceres."
      },
      {
        "parada": 5,
        "titulo": "La Mezquita y Aljibe Árabe. Museo de Cáceres",
        "tiempo": "00:55 - 01:15",
        "distancia_tramo": "0,3 km",
        "descripcion": "Resto excepcional de la alcazaba almohade (siglos XI-XII) bajo el Palacio de las Veletas, con cinco naves sobre arcos de herradura."
      },
      {
        "parada": 6,
        "titulo": "Torre Albarrana y Adosada. Olivar de la Judería",
        "tiempo": "01:20 - 01:28",
        "distancia_tramo": "0,2 km",
        "descripcion": "Sector sur de la fortificación almohade con torres albarranas y adosadas junto al jardín del Olivar de la Judería."
      },
      {
        "parada": 7,
        "titulo": "Torre Mochada",
        "tiempo": "01:30 - 01:36",
        "distancia_tramo": "0,2 km",
        "descripcion": "Torreón defensivo en el sector meridional de la muralla que vigila el acceso desde el sur."
      },
      {
        "parada": 8,
        "titulo": "Torre de Mérida Este",
        "tiempo": "01:38 - 01:44",
        "distancia_tramo": "0,15 km",
        "descripcion": "Baluarte defensivo situado junto a la desaparecida Puerta de Mérida en el lienzo sur."
      },
      {
        "parada": 9,
        "titulo": "Baluarte de los Pozos",
        "tiempo": "01:48 - 02:00",
        "distancia_tramo": "0,25 km",
        "descripcion": "Torre almohade del siglo XII accesible desde la Judería Vieja que custodiaba pozos estratégicos para resistir asedios."
      },
      {
        "parada": 10,
        "titulo": "La Muralla Árabe",
        "tiempo": "02:03 - 02:10",
        "distancia_tramo": "0,2 km",
        "descripcion": "Lienzo oriental levantado a finales del siglo XII que rodeaba la vida política, económica, militar y religiosa de Hizn Qazris."
      },
      {
        "parada": 11,
        "titulo": "Arco del Cristo y Torre de la Puerta del Concejo",
        "tiempo": "02:12 - 02:20",
        "distancia_tramo": "0,2 km",
        "descripcion": "Puerta romana del Río flanqueada por defensas almohades que abren la medina hacia la Ribera del Marco y Fuente Concejo."
      },
      {
        "parada": 12,
        "titulo": "Casa - Museo Árabe Yusuf Al Burch",
        "tiempo": "02:22 - 02:32",
        "distancia_tramo": "0,2 km",
        "descripcion": "Casa-museo de iniciativa privada en la Cuesta del Marqués que recrea la vida cotidiana en una vivienda árabe del siglo XII."
      },
      {
        "parada": 13,
        "titulo": "Torre de la Yerba",
        "tiempo": "02:35 - 02:45",
        "distancia_tramo": "0,3 km (Final)",
        "descripcion": "Torre albarrana almohade del siglo XII en la Plaza Mayor que sigue el modelo constructivo auténtico de tapial."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "La Muralla y Torre del Horno",
        "tiempo_parada": "12 min",
        "claves": "La muralla conserva su trazado rectangular atravesado por las antiguas vías Cardo y Decumano, cuyo cruce era el foro romano en la actual Plaza de Santa María.",
        "audio_texto": "Comenzamos junto a la Muralla y la Torre del Horno. Los almohades reforzaron los antiguos muros romanos mediante tapial y mampostería para defender Hizn Qazris del avance de los reinos cristianos.",
        "curiosidad": "De las cuatro puertas romanas originales desaparecieron Coria y Mérida, una se transformó en el Arco de la Estrella y solo subsiste el Arco del Cristo."
      },
      {
        "num": 2,
        "nombre": "Torre del Postigo y Arco Santa Ana",
        "tiempo_parada": "10 min",
        "claves": "El arco exterior hacia el adarve muestra una hornacina con imagen de Santa Ana con la Virgen y el Niño; interior cubierto por bóvedas de ladrillo características de Cáceres.",
        "audio_texto": "El Arco de Santa Ana es uno de los postigos abiertos en la muralla para facilitar la comunicación con los arrabales, destacando sus bóvedas de rosca de ladrillo.",
        "curiosidad": "Las bóvedas de rosca de ladrillo son una solución constructiva muy característica de la arquitectura tradicional cacereña."
      },
      {
        "num": 3,
        "nombre": "Torre del Aver",
        "tiempo_parada": "8 min",
        "claves": "Destaca por su planta semicircular/octogonal poco común en el recinto cacereño, vigilando el flanco sur-occidental.",
        "audio_texto": "Continuando por el lienzo oeste encontramos la Torre del Aver, vigía del flanco suroccidental de la antigua medina.",
        "curiosidad": "Su basamento reutiliza sillería romana sobre la que se levantó la fábrica medieval."
      },
      {
        "num": 4,
        "nombre": "Casa Mudéjar",
        "tiempo_parada": "10 min",
        "claves": "Sobresale el uso del ladrillo rojo con decoración en zig-zag y en dientes de sierra en frisos y vanos.",
        "audio_texto": "La Casa Mudéjar, levantada en el siglo XIV, demuestra la pervivencia de los alarifes y técnicas hispanomusulmanas tras la conquista cristiana, visible en sus frisos de ladrillo en zig-zag y dientes de sierra.",
        "curiosidad": "Es considerada uno de los ejemplos más singulares de arquitectura doméstica mudéjar de Extremadura."
      },
      {
        "num": 5,
        "nombre": "Aljibe Árabe · Museo de Cáceres",
        "tiempo_parada": "20 min",
        "claves": "La antigua Mezquita ocupaba el solar de San Mateo, el punto más alto. El aljibe sigue recogiendo la lluvia del patio renacentista superior. Horario: 9:00-14:30 y 17:00-20:00 (verano) / 16:00-19:00 (invierno); domingos 10:15-14:30; lunes cerrado.",
        "audio_texto": "En el Palacio de las Veletas, actual Museo de Cáceres, se esconde el Aljibe Árabe de los siglos XI y XII, uno de los mayores y mejor conservados de su época en el mundo. La luz dorada cae desde el patio sobre sus cinco naves de arcos de herradura.",
        "curiosidad": "El aljibe continúa recogiendo el agua de lluvia del patio renacentista que lo cubre, exactamente como hace ocho siglos."
      },
      {
        "num": 6,
        "nombre": "Torre Albarrana y Olivar de la Judería",
        "tiempo_parada": "8 min",
        "claves": "Muestra la articulación entre la muralla exterior, las torres adelantadas y el paisaje de olivos intramuros.",
        "audio_texto": "Descendiendo hacia el sur bordeamos el Olivar de la Judería, donde las torres albarranas y adosadas protegían el flanco más elevado sobre la Ribera.",
        "curiosidad": "El Olivar ofrece un remanso verde intramuros con vistas directas a las defensas almohades."
      },
      {
        "num": 7,
        "nombre": "Torre Mochada",
        "tiempo_parada": "6 min",
        "claves": "Su nombre alude a la pérdida de su remate superior original, conservando la contundencia de su planta militar.",
        "audio_texto": "La Torre Mochada formaba parte del cinturón defensivo meridional que vigilaba los caminos hacia Mérida.",
        "curiosidad": "Da nombre a la calle Torremochada, paralela al trazado sur de la muralla."
      },
      {
        "num": 8,
        "nombre": "Torre de Mérida Este",
        "tiempo_parada": "6 min",
        "claves": "Defendía el acceso meridional de la medina almohade conectado con la calzada hacia el sur.",
        "audio_texto": "Junto al solar de la antigua Puerta de Mérida, la Torre de Mérida Este reforzaba el acceso sur de Hizn Qazris.",
        "curiosidad": "La Puerta de Mérida fue derribada en 1751, pero el callejero aún conserva su nombre."
      },
      {
        "num": 9,
        "nombre": "Baluarte de los Pozos",
        "tiempo_parada": "12 min",
        "claves": "Horario: 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno); lunes cerrado.",
        "audio_texto": "Entrando por una casa tradicional de la Judería Vieja visitamos el Baluarte de los Pozos, torre almohade del siglo XII diseñada para proteger el agua en caso de sitio militar.",
        "curiosidad": "Conecta visualmente la fortificación con la Cisterna de San Roque y el valle de la Ribera del Marco."
      },
      {
        "num": 10,
        "nombre": "La Muralla Árabe",
        "tiempo_parada": "7 min",
        "claves": "Uno de los recintos amurallados almohades mejor conservados de la Península Ibérica, construido en tapial sobre basamento pétreo.",
        "audio_texto": "Recorremos el flanco oriental de la Muralla Árabe, levantada a finales del siglo XII cuando Hizn Qazris era plaza fuerte fronteriza.",
        "curiosidad": "Tras varios años de asedio, Alfonso IX de León tomó la ciudad el 23 de abril de 1229, festividad de San Jorge, patrón de Cáceres."
      },
      {
        "num": 11,
        "nombre": "Arco del Cristo y Puerta del Concejo",
        "tiempo_parada": "8 min",
        "claves": "Única puerta romana conservada de las cuatro originales; punto de encuentro entre el recinto islámico y los manantiales exteriores.",
        "audio_texto": "El Arco del Cristo y la Torre de la Puerta del Concejo vigilaban el paso entre la ciudad amurallada y las huertas y fuentes de la Ribera.",
        "curiosidad": "En su entorno inmediato se conservan sillares romanos, lienzos almohades y casas encaladas de la Judería Vieja."
      },
      {
        "num": 12,
        "nombre": "Casa-Museo Árabe Yusuf Al Burch",
        "tiempo_parada": "10 min",
        "claves": "Enclavada junto al Arco del Cristo y el inicio del Barrio Judío. Horario: Lunes a domingo de 10:00 a 14:00 y de 18:00 a 20:00.",
        "audio_texto": "En la pintoresca Cuesta del Marqués, la Casa-Museo Árabe Yusuf Al Burch recrea estancias, aljibe y vida cotidiana de la Cáceres islámica.",
        "curiosidad": "El edificio conserva arcos, patio y aljibe doméstico ambientados con mobiliario y cerámica de inspiración andalusí."
      },
      {
        "num": 13,
        "nombre": "Torre de la Yerba",
        "tiempo_parada": "10 min",
        "claves": "Unida a la muralla mediante un muro de enlace, construida en tapial de tierra prensada sobre basamento de sillería.",
        "audio_texto": "Finalizamos en la Plaza Mayor ante la Torre de la Yerba, paradigma de la ingeniería militar almohade de torres albarranas en tapial.",
        "curiosidad": "Su técnica de tapial funciona de manera análoga a un encofrado moderno, apisonando capas de tierra, cal y áridos."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🏛️",
        "nombre": "Museo de Cáceres (Aljibe Árabe)",
        "desc": "Martes a sábado 9:00-14:30 y tardes (17:00-20:00 verano / 16:00-19:00 invierno). Domingos 10:15-14:30. Lunes cerrado."
      },
      {
        "icono": "🏰",
        "nombre": "Baluarte de los Pozos",
        "desc": "Martes a domingo 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno). Lunes cerrado."
      },
      {
        "icono": "🕌",
        "nombre": "Casa-Museo Yusuf Al Burch",
        "desc": "Lunes a domingo de 10:00 a 14:00 y de 18:00 a 20:00 h (Cuesta del Marqués)."
      }
    ],
    "recomendaciones": [
      "Llevar calzado cómodo con buena suela para las cuestas empedradas de la Judería Vieja y Cuesta del Marqués.",
      "Planificar la visita de martes a domingo para poder entrar al Aljibe del Museo de Cáceres y al Baluarte de los Pozos.",
      "Realizar la ruta al atardecer en verano para apreciar la luz rasante sobre los muros de tapial."
    ],
    "sostenibilidad": [
      "Ruta íntegramente peatonal dentro del Conjunto Monumental declarado Patrimonio Mundial por la UNESCO.",
      "Respeto al descanso vecinal en las calles estrechas del barrio de San Antonio."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-4",
    "slug": "ciudad-cristiana-y-sus-torres",
    "file": "routes/ruta-04-ciudad-cristiana-torres.html",
    "pdf": "routes/RUTAS/Ruta_La_ciudad_cristiana_y_sus_Torres.pdf",
    "nombre": "4. La ciudad cristiana y sus Torres",
    "eslogan": "Casas-fortaleza, linajes nobles, escudos heráldicos y las torres desmochadas por Isabel la Católica",
    "tematica": "Patrimonio, Arquitectura Palaciega y Heráldica",
    "descripcion": "Recorrido por los once palacios y torres más emblemáticos de la Cáceres cristiana bajomedieval y renacentista. Descubre las casas-fortaleza de los linajes cacereños, los matacanes defensivos, las fachadas platerescas y el célebre desmoche ordenado por la reina Isabel de Castilla.",
    "publico": "Público general, entusiastas de la historia medieval, heráldica, arquitectura gótica y renacentista.",
    "duracion": "2 horas y 15 minutos",
    "distancia": "1,9 km",
    "dificultad": "Baja (Urbana Monumental)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Accesible en gran parte del recorrido principal (Plaza Mayor, Santa María y San Jorge); pavimento empedrado tradicional.",
    "inicio_final": "Inicio en Palacio y Torre de Galarza / Final en Palacio de los Golfines de Arriba",
    "numero_paradas": 11,
    "bg_gradient": "linear-gradient(135deg, #b45309 0%, #451a03 100%)",
    "mapa": {
      "viewBox": "0 0 1280 400",
      "svgPath": "M 95,208 C 150,208 150,265 204,265 C 258,265 258,254 313,254 C 368,254 368,189 422,189 C 476,189 476,146 531,146 C 586,146 586,176 640,176 C 694,176 694,244 749,244 C 804,244 804,269 858,269 C 912,269 912,222 967,222 C 1022,222 1022,158 1076,158 C 1130,158 1130,154 1185,154",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 208,
          "name": "Palacio y Torre de Gal…",
          "label_y": 174
        },
        {
          "num": 2,
          "x": 204,
          "y": 265,
          "name": "Torre de los Púlpitos",
          "label_y": 309
        },
        {
          "num": 3,
          "x": 313,
          "y": 254,
          "name": "Torre de Bujaco",
          "label_y": 220
        },
        {
          "num": 4,
          "x": 422,
          "y": 189,
          "name": "Torre de Espaderos",
          "label_y": 233
        },
        {
          "num": 5,
          "x": 531,
          "y": 146,
          "name": "Palacio y Torre de Car…",
          "label_y": 112
        },
        {
          "num": 6,
          "x": 640,
          "y": 176,
          "name": "Palacio y Torre de Her…",
          "label_y": 220
        },
        {
          "num": 7,
          "x": 749,
          "y": 244,
          "name": "Palacio de los Golfine…",
          "label_y": 210
        },
        {
          "num": 8,
          "x": 858,
          "y": 269,
          "name": "Palacio y Torre de las…",
          "label_y": 313
        },
        {
          "num": 9,
          "x": 967,
          "y": 222,
          "name": "Torre de los Sande",
          "label_y": 188
        },
        {
          "num": 10,
          "x": 1076,
          "y": 158,
          "name": "Palacio Marqueses de T…",
          "label_y": 202
        },
        {
          "num": 11,
          "x": 1185,
          "y": 154,
          "name": "Palacio de los Golfine…",
          "label_y": 120
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Palacio y Torre de Galarza",
        "tiempo": "00:00 - 00:10",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Reformado en el siglo XVI en estilo plateresco, célebre por su ventana de esquina y patio interior porticado."
      },
      {
        "parada": 2,
        "titulo": "Torre de los Púlpitos",
        "tiempo": "00:14 - 00:24",
        "distancia_tramo": "0,2 km",
        "descripcion": "Única torre añadida a la muralla tras la conquista leonesa (16 m), levantada en sillería de piedra."
      },
      {
        "parada": 3,
        "titulo": "Torre de Bujaco",
        "tiempo": "00:26 - 00:38",
        "distancia_tramo": "0,1 km",
        "descripcion": "Símbolo de Cáceres: torre albarrana de 25 m del siglo XII con matacanes, almenas y balconcillo renacentista."
      },
      {
        "parada": 4,
        "titulo": "Torre de Espaderos",
        "tiempo": "00:42 - 00:52",
        "distancia_tramo": "0,25 km",
        "descripcion": "Torre bajomedieval (siglos XIV-XV) de planta cuadrada con matacán en esquina, ventana geminada y desmoche isabelino."
      },
      {
        "parada": 5,
        "titulo": "Palacio y Torre de Carvajal",
        "tiempo": "00:56 - 01:10",
        "distancia_tramo": "0,2 km",
        "descripcion": "Tipología clásica del palacio cacereño con balcón de esquina, gran escudo frontal, portada de dovelas radiales y jardín interior con higuera."
      },
      {
        "parada": 6,
        "titulo": "Palacio de Hernando de Ovando y su Torre",
        "tiempo": "01:12 - 01:20",
        "distancia_tramo": "0,15 km",
        "descripcion": "Palacio del siglo XVI junto a Santa María con escudo esgrafiado del XVIII y cuatro crujías en torno a un patio claustrado."
      },
      {
        "parada": 7,
        "titulo": "Palacio de los Golfines de Abajo",
        "tiempo": "01:24 - 01:36",
        "distancia_tramo": "0,15 km",
        "descripcion": "Una de las fachadas platerescas más ricas del Conjunto Monumental, donde se alojaron los Reyes Católicos."
      },
      {
        "parada": 8,
        "titulo": "Palacio y Torre de las Cigüeñas",
        "tiempo": "01:40 - 01:50",
        "distancia_tramo": "0,2 km",
        "descripcion": "Única torre noble que conservó sus almenas y altura intactas por privilegio expreso de Isabel la Católica."
      },
      {
        "parada": 9,
        "titulo": "Torre de los Sande",
        "tiempo": "01:54 - 02:02",
        "distancia_tramo": "0,2 km",
        "descripcion": "Construida en el siglo XIV, una de las torres señoriales más antiguas de Cáceres, en estilo gótico."
      },
      {
        "parada": 10,
        "titulo": "Palacio de los Marqueses de Torreorgaz",
        "tiempo": "02:05 - 02:12",
        "distancia_tramo": "0,2 km",
        "descripcion": "También llamado Palacio del Comendador de Alcuéscar, suma de estilos desde el Gótico hasta la fachada del siglo XVIII."
      },
      {
        "parada": 11,
        "titulo": "Palacio de los Golfines de Arriba",
        "tiempo": "02:15 - 02:25",
        "distancia_tramo": "0,25 km (Final)",
        "descripcion": "Imponente casa-fortaleza con marcado carácter defensivo, torres desmochadas en las esquinas y gran torre del homenaje central."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Palacio y Torre de Galarza",
        "tiempo_parada": "10 min",
        "claves": "Destaca la ventana de esquina con decoración plateresca en la torre y el patio con columnas. También conocida popularmente como la Torre de los Trucos.",
        "audio_texto": "Iniciamos la ruta de las torres en el Palacio de Galarza, reformado en el siglo XVI en estilo plateresco y célebre por su elegante ventana de esquina.",
        "curiosidad": "Debe su nombre al obispo Galarza y anteriormente perteneció a los Mesía de Ovando."
      },
      {
        "num": 2,
        "nombre": "Torre de los Púlpitos",
        "tiempo_parada": "10 min",
        "claves": "Unida mediante un arco-puente del siglo XVIII al Palacio de Mayoralgo para contemplar espectáculos en la Plaza Mayor. Visitable a través de la Torre de Bujaco.",
        "audio_texto": "Con dieciséis metros de altura, la Torre de los Púlpitos es la única torre añadida a la muralla después de la conquista cristiana, usando sillería de piedra en lugar de tapial.",
        "curiosidad": "El arco-puente que la une al Palacio de Mayoralgo servía de palco privado sobre los festejos de la Plaza Mayor."
      },
      {
        "num": 3,
        "nombre": "Torre de Bujaco",
        "tiempo_parada": "12 min",
        "claves": "Conecta con la muralla por un puente de vigilancia y alberga el Centro de Interpretación de las Tres Culturas. Horario: L-D 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno).",
        "audio_texto": "La Torre de Bujaco domina la Plaza Mayor con sus veinticinco metros de altura. Desde su acceso se puede recorrer el adarve y visitar el Centro de Interpretación de las Tres Culturas.",
        "curiosidad": "Combina la arquitectura militar almohade del siglo XII con el balconcillo renacentista añadido en el siglo XVI."
      },
      {
        "num": 4,
        "nombre": "Torre de Espaderos",
        "tiempo_parada": "10 min",
        "claves": "Mira hacia el emplazamiento de la antigua Puerta de Coria, donde a sus pies afloran sillares romanos de la muralla.",
        "audio_texto": "En la Torre de Espaderos se aprecia con claridad el desmoche ordenado por Isabel la Católica para frenar las luchas de bandos nobiliarios, además de un espléndido matacán en esquina.",
        "curiosidad": "A los pies de la torre aún se distinguen sillares romanos de la desaparecida Puerta de Coria."
      },
      {
        "num": 5,
        "nombre": "Palacio y Torre de Carvajal",
        "tiempo_parada": "14 min",
        "claves": "Sede del Patronato de Turismo de la Diputación y Centro de Interpretación de las Comarcas. Horario: L-V 8:00-21:15; S 10:00-14:00 y 17:00-20:00; D y fest. 10:00-14:00.",
        "audio_texto": "El Palacio de Carvajal resume la arquitectura señorial cacereña y esconde un patio-huerto con una centenaria higuera, además de su famosa torre redonda.",
        "curiosidad": "Su huerto interior es uno de los mejores ejemplos de jardines privados escondidos dentro de la Ciudad Monumental."
      },
      {
        "num": 6,
        "nombre": "Palacio y Torre de Hernando de Ovando",
        "tiempo_parada": "8 min",
        "claves": "Sobre la puerta de entrada al primer piso de la torre figura una inscripción fechada en el año 1480.",
        "audio_texto": "Muy cerca de la Concatedral de Santa María, el Palacio de Hernando de Ovando luce en su fachada un escudo esgrafiado del siglo XVIII que reúne los linajes que lo habitaron.",
        "curiosidad": "Una inscripción de 1480 sobre el acceso al primer piso data la torre en pleno reinado de los Reyes Católicos."
      },
      {
        "num": 7,
        "nombre": "Palacio de los Golfines de Abajo",
        "tiempo_parada": "12 min",
        "claves": "Ocupó el solar de casi una veintena de casas. En la fachada destacan el escudo real y la divisa «Fer de Fer»: Fernando (Golfín) de Fernando (el Católico).",
        "audio_texto": "El Palacio de los Golfines de Abajo hospedó a los Reyes Católicos en sus visitas a Cáceres. Su imponente fachada plateresca proclama la lealtad del linaje con el lema Fer de Fer.",
        "curiosidad": "Para levantar semejante palacio urbano la familia Golfín reunió el solar de cerca de veinte viviendas medievales."
      },
      {
        "num": 8,
        "nombre": "Palacio y Torre de las Cigüeñas",
        "tiempo_parada": "10 min",
        "claves": "Mandado construir por el capitán Diego de Ovando, vasallo y miembro del Real Consejo de la reina, que la eximió del desmoche general.",
        "audio_texto": "La Torre de las Cigüeñas se eleva por encima del resto de palacios porque Isabel la Católica concedió a Diego de Ovando el privilegio único de conservar sus almenas.",
        "curiosidad": "Es la única torre nobiliaria sin desmochar de toda la Ciudad Monumental de Cáceres."
      },
      {
        "num": 9,
        "nombre": "Torre de los Sande",
        "tiempo_parada": "8 min",
        "claves": "Exhibe un soberbio matacán defensivo, ventana geminada y elementos góticos de gran pureza.",
        "audio_texto": "La Torre de los Sande, levantada en el siglo XIV, es una de las más antiguas de Cáceres y conserva un espectacular matacán defensivo gótico.",
        "curiosidad": "La hiedra que tradicionalmente cubría parte de su fábrica la convirtió en una de las estampas más románticas de San Mateo."
      },
      {
        "num": 10,
        "nombre": "Palacio Marqueses de Torreorgaz",
        "tiempo_parada": "7 min",
        "claves": "Conserva puertas, ventanas y torre góticas integradas con reformas barrocas del siglo XVIII.",
        "audio_texto": "El Palacio de los Marqueses de Torreorgaz, hoy parte del Parador de Cáceres, refleja siglos de evolución arquitectónica desde su torre gótica hasta su fachada dieciochesca.",
        "curiosidad": "Recibía el nombre de Palacio del Comendador de Alcuéscar por los cargos militares de sus propietarios."
      },
      {
        "num": 11,
        "nombre": "Palacio de los Golfines de Arriba",
        "tiempo_parada": "10 min",
        "claves": "Evoca mejor que ningún otro edificio la idea primigenia de palacio fortificado urbano en la Cáceres medieval.",
        "audio_texto": "Cerramos la ruta ante el Palacio de los Golfines de Arriba, una auténtica casa-fortaleza con torres desmochadas en las esquinas y una gran torre del homenaje en su centro.",
        "curiosidad": "Representa la rama rival de los Golfines frente a los Golfines de Abajo, en una ciudad marcada por las disputas nobiliarias bajomedievales."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "ℹ️",
        "nombre": "Patronato de Turismo (Palacio de Carvajal)",
        "desc": "L-V 8:00-21:15 h; Sábados 10:00-14:00 y 17:00-20:00 h; Domingos y festivos 10:00-14:00 h."
      },
      {
        "icono": "🏰",
        "nombre": "Torre de Bujaco y Púlpitos",
        "desc": "L-D 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno)."
      },
      {
        "icono": "🍽️",
        "nombre": "Hostelería patrimonial",
        "desc": "Restaurantes y terrazas en Plaza Mayor, San Jorge y calle Ancha."
      }
    ],
    "recomendaciones": [
      "Fijarse en los escudos heráldicos, ventanas de esquina y la diferencia de altura entre la Torre de las Cigüeñas y las torres desmochadas.",
      "Entrar al patio y jardín del Palacio de Carvajal (acceso gratuito en horario de apertura).",
      "Llevar cámara o prismáticos ligeros para apreciar los matacanes y detalles platerescos en altura."
    ],
    "sostenibilidad": [
      "Itinerario 100% peatonal de corta distancia en el corazón histórico.",
      "Conservación activa del patrimonio arquitectónico y respeto a los espacios culturales visitables."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-5",
    "slug": "juderia-vieja-caceres",
    "file": "routes/ruta-05-juderia-vieja.html",
    "pdf": "routes/RUTAS/Ruta_La_juderia_vieja_de_Caceres.pdf",
    "nombre": "5. Ruta por la Judería Vieja",
    "eslogan": "El Barrio de San Antonio de la Quebrada: casas encaladas, antigua sinagoga y memoria de Sefarad",
    "tematica": "Esencia, Patrimonio, Cultura Sefardí e Historia",
    "descripcion": "La presencia documentada de judíos en Cáceres se remonta al Fuero de 1229 otorgado por Alfonso IX de León. En 1474 su aljama figuraba entre las cinco primeras de Castilla y en 1479 sumaba unos 650 vecinos judíos hasta el Edicto de Expulsión de 1492. Esta ruta recorre sus calles encaladas, cuestas con pretiles y su antigua sinagoga intramuros.",
    "publico": "Público general, viajeros de la Red de Juderías de España, amantes de la historia sefardí y fotografía urbana.",
    "duracion": "1 hora y 45 minutos",
    "distancia": "1,6 km",
    "dificultad": "Media-Baja (Cuestas empinadas y escalonadas)",
    "dificultad_class": "diff-media",
    "accesibilidad": "Parcialmente accesible - Calles estrechas y fuertes pendientes con pretiles en el Barrio de la Quebrada.",
    "inicio_final": "Inicio en Plaza de San Jorge / Final en Plaza de Santa María",
    "numero_paradas": 10,
    "bg_gradient": "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)",
    "mapa": {
      "viewBox": "0 0 1040 380",
      "svgPath": "M 95,198 C 142,198 142,254 189,254 C 236,254 236,244 284,244 C 331,244 331,179 378,179 C 426,179 426,136 473,136 C 520,136 520,166 567,166 C 614,166 614,233 662,233 C 709,233 709,258 756,258 C 804,258 804,211 851,211 C 898,211 898,148 945,148",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 198,
          "name": "Plaza de San Jorge",
          "label_y": 164
        },
        {
          "num": 2,
          "x": 189,
          "y": 254,
          "name": "Callejón de Don Álvaro",
          "label_y": 298
        },
        {
          "num": 3,
          "x": 284,
          "y": 244,
          "name": "Calle Pereros",
          "label_y": 210
        },
        {
          "num": 4,
          "x": 378,
          "y": 179,
          "name": "Olivar de la Judería",
          "label_y": 223
        },
        {
          "num": 5,
          "x": 473,
          "y": 136,
          "name": "Baluarte de los Pozos",
          "label_y": 102
        },
        {
          "num": 6,
          "x": 567,
          "y": 166,
          "name": "Casa del Judío Rico",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 662,
          "y": 233,
          "name": "Ermita de San Antonio…",
          "label_y": 199
        },
        {
          "num": 8,
          "x": 756,
          "y": 258,
          "name": "Arco del Cristo",
          "label_y": 302
        },
        {
          "num": 9,
          "x": 851,
          "y": 211,
          "name": "Rincón de la Monja",
          "label_y": 177
        },
        {
          "num": 10,
          "x": 945,
          "y": 148,
          "name": "Plaza de Santa María",
          "label_y": 192
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Plaza de San Jorge",
        "tiempo": "00:00 - 00:10",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Punto de partida monumental que enlaza el corazón palaciego de Cáceres con el descenso hacia el barrio de la Judería Vieja."
      },
      {
        "parada": 2,
        "titulo": "Callejón de Don Álvaro (Barrio de la Quebrada)",
        "tiempo": "00:12 - 00:22",
        "distancia_tramo": "0,15 km",
        "descripcion": "Trama de viviendas populares de una planta con paredes encaladas, vanos desorganizados, grandes chimeneas de ladrillo y pretiles."
      },
      {
        "parada": 3,
        "titulo": "Calle Pereros",
        "tiempo": "00:25 - 00:35",
        "distancia_tramo": "0,2 km",
        "descripcion": "Acceso al centro del Barrio de San Antonio de la Quebrada, donde conviven viviendas sencillas y callejuelas irregulares."
      },
      {
        "parada": 4,
        "titulo": "Olivar de la Judería",
        "tiempo": "00:38 - 00:46",
        "distancia_tramo": "0,15 km",
        "descripcion": "Espacio ajardinado con olivos adosado a la muralla sur-oriental, mirador tranquilo sobre la Ribera del Marco."
      },
      {
        "parada": 5,
        "titulo": "Baluarte de los Pozos",
        "tiempo": "00:50 - 01:02",
        "distancia_tramo": "0,2 km",
        "descripcion": "Torre almohade del siglo XII a la que se accede por una casa antigua de la Judería Vieja, protectora de pozos estratégicos."
      },
      {
        "parada": 6,
        "titulo": "Casa del Judío Rico",
        "tiempo": "01:05 - 01:13",
        "distancia_tramo": "0,15 km",
        "descripcion": "Ejemplo emblemático de las casas encaladas con portada adintelada que aprovechan la propia muralla como pared trasera."
      },
      {
        "parada": 7,
        "titulo": "Ermita de San Antonio. Antigua Sinagoga",
        "tiempo": "01:16 - 01:28",
        "distancia_tramo": "0,15 km",
        "descripcion": "Construida en el siglo XV por iniciativa de la familia Golfín sobre el solar de la Sinagoga de la Judería Vieja."
      },
      {
        "parada": 8,
        "titulo": "Arco del Cristo (Puerta del Río)",
        "tiempo": "01:30 - 01:38",
        "distancia_tramo": "0,2 km",
        "descripcion": "Puerta romana del siglo I con grandes sillares a soga y tizón y bóveda de cañón, acceso directo a la Judería Vieja y la Cuesta del Marqués."
      },
      {
        "parada": 9,
        "titulo": "Rincón de la Monja y Oficios de la Aljama",
        "tiempo": "01:40 - 01:46",
        "distancia_tramo": "0,2 km",
        "descripcion": "Parada dedicada a los oficios artesanos y comerciales que desempeñaban los judíos cacereños."
      },
      {
        "parada": 10,
        "titulo": "Plaza de Santa María · Memoria de 1492",
        "tiempo": "01:48 - 01:55",
        "distancia_tramo": "0,2 km (Final)",
        "descripcion": "Cierre de la ruta evocando el Edicto de Expulsión del 31 de marzo de 1492 y la diáspora sefardí."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Plaza de San Jorge",
        "tiempo_parada": "10 min",
        "claves": "Presidida por la iglesia de San Francisco Javier y la escultura de San Jorge, marca el umbral hacia las callejuelas encaladas de San Antonio.",
        "audio_texto": "Partimos desde la Plaza de San Jorge para adentrarnos en la Judería Vieja, uno de los barrios con mayor personalidad y memoria sefardí de Cáceres.",
        "curiosidad": "Desde aquí se aprecia el contraste entre la piedra monumental de los palacios y la arquitectura popular encalada del barrio judío."
      },
      {
        "num": 2,
        "nombre": "Callejón de Don Álvaro",
        "tiempo_parada": "10 min",
        "claves": "Más extensa que la Judería Nueva, se adapta a los fuertes desniveles del terreno con cuestas disimuladas por pretiles que originaron el nombre popular de «Barrio de la Quebrada».",
        "audio_texto": "El Callejón de Don Álvaro nos introduce en el Barrio de la Quebrada: casas bajas encaladas, grandes chimeneas de ladrillo y cuestas salvadas por pretiles.",
        "curiosidad": "Las paredes blanqueadas con cal ofrecen un contraste llamativo frente al granito dorado de los palacios nobles cercanos."
      },
      {
        "num": 3,
        "nombre": "Calle Pereros",
        "tiempo_parada": "10 min",
        "claves": "El barrio toma su nombre de la Ermita de San Antonio, levantada sobre la antigua sinagoga, destacando el contraste entre su urbanismo irregular y los palacios heráldicos vecinos.",
        "audio_texto": "En la Calle Pereros observamos la transición entre las mansiones nobiliarias y las callejuelas estrechas del barrio de San Antonio de la Quebrada.",
        "curiosidad": "En 1474 el Repartimiento del rabí Jacob Aben Núñez situaba la aljama cacereña entre las cinco más prósperas de Castilla (8.200 maravedíes de tributo)."
      },
      {
        "num": 4,
        "nombre": "Olivar de la Judería",
        "tiempo_parada": "8 min",
        "claves": "Recuerda el paisaje agrícola y recoleto que bordeaba el recinto intramuros de la comunidad judía.",
        "audio_texto": "El Olivar de la Judería abre un respiro de sombra y olivos junto a la muralla antes de descender al Baluarte de los Pozos.",
        "curiosidad": "Es uno de los rincones más silenciosos del casco antiguo para observar la estructura defensiva de la muralla."
      },
      {
        "num": 5,
        "nombre": "Baluarte de los Pozos",
        "tiempo_parada": "12 min",
        "claves": "Horario: 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno). Lunes cerrado.",
        "audio_texto": "Desde una vivienda tradicional de la Judería Vieja accedemos al Baluarte de los Pozos, donde la torre almohade del siglo XII custodiaba el agua vital de la ciudad.",
        "curiosidad": "Su integración con las viviendas populares del barrio ilustra cómo la población convivía adosada a las defensas."
      },
      {
        "num": 6,
        "nombre": "Casa del Judío Rico",
        "tiempo_parada": "8 min",
        "claves": "Situada en las empinadas calles recoletas presididas por la Ermita de San Antonio.",
        "audio_texto": "La Casa del Judío Rico muestra una solución constructiva muy original de la Judería Vieja: viviendas encaladas de portada adintelada que utilizan la muralla como muro posterior.",
        "curiosidad": "El barrio conserva intacta su escala doméstica medieval a pesar del paso de más de cinco siglos."
      },
      {
        "num": 7,
        "nombre": "Ermita de San Antonio · Sinagoga",
        "tiempo_parada": "12 min",
        "claves": "Pequeña ermita de una sola nave con retablo en el ábside dedicado a San Antonio de Padua, San Juan Bautista, la Sagrada Familia y San Miguel Arcángel en el remate.",
        "audio_texto": "La Ermita de San Antonio ocupa el lugar de la antigua Sinagoga de la Judería Vieja, del mismo modo que San Mateo ocupó la mezquita. Su arquitectura popular y su entorno son de los más pintorescos de Cáceres.",
        "curiosidad": "Marca el epicentro espiritual del antiguo barrio judío intramuros hasta el traslado obligado de 1478 a la Judería Nueva."
      },
      {
        "num": 8,
        "nombre": "Arco del Cristo",
        "tiempo_parada": "8 min",
        "claves": "Única puerta romana original conservada de las cuatro que tuvo la muralla; vano de amplia luz y profundo intradós.",
        "audio_texto": "El Arco del Cristo, del siglo I, servía de entrada y salida hacia la Ribera del Marco y enlaza directamente con la Judería Vieja y la Cuesta del Marqués.",
        "curiosidad": "Su robusta bóveda de cañón en granito ha resistido dos mil años de historia."
      },
      {
        "num": 9,
        "nombre": "Rincón de la Monja",
        "tiempo_parada": "6 min",
        "claves": "Plateros, jubeteros, sastres, herreros, zapateros, curtidores y el médico rabí Yuçe (que ejerció desde 1478) conformaban el pulso económico de la aljama.",
        "audio_texto": "En el Rincón de la Monja recordamos los oficios que dieron vida a la comunidad: plateros, sastres, zapateros, herreros, curtidores y el médico rabí Yuçe.",
        "curiosidad": "En 1479 vivían en Cáceres unos 130 vecinos judíos casados, alrededor de 650 personas en una villa de unos 10.000 habitantes."
      },
      {
        "num": 10,
        "nombre": "Plaza de Santa María",
        "tiempo_parada": "7 min",
        "claves": "Los judíos cacereños marcharon al exilio conservando apellidos («alkunyes») como Casseres, Coriat, Kuriat o Alburkerk, memoria viva de Sefarad.",
        "audio_texto": "Concluimos en la Plaza de Santa María recordando el 31 de marzo de 1492, cuando el Edicto de Expulsión obligó a partir a los judíos de Cáceres, que llevaron por el mundo apellidos como Casseres o Coriat.",
        "curiosidad": "El apellido «Casseres» perdura aún hoy en comunidades sefardíes de todo el mundo como recuerdo de su origen cacereño."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🏰",
        "nombre": "Baluarte de los Pozos",
        "desc": "Abierto de martes a domingo: 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno)."
      },
      {
        "icono": "ℹ️",
        "nombre": "Información Turística",
        "desc": "Puntos de información en Plaza Mayor y Palacio de Carvajal."
      },
      {
        "icono": "🚰",
        "nombre": "Fuentes y descanso",
        "desc": "Olivar de la Judería y plazas del entorno monumental."
      }
    ],
    "recomendaciones": [
      "Calzado antideslizante imprescindible para las cuestas empinadas de San Antonio de la Quebrada.",
      "Se recomienda combinar esta ruta con la Ruta 6 (La Judería Nueva) para completar el legado sefardí de Cáceres.",
      "Respetar la tranquilidad de las viviendas particulares del barrio."
    ],
    "sostenibilidad": [
      "Recorrido 100% a pie por calles peatonales históricas.",
      "Puesta en valor del patrimonio inmaterial sefardí y de la arquitectura popular encalada."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-6",
    "slug": "juderia-nueva-caceres",
    "file": "routes/ruta-06-juderia-nueva.html",
    "pdf": "routes/RUTAS/Ruta_La_juderia_nueva_de_Caceres.pdf",
    "nombre": "6. La Judería Nueva",
    "eslogan": "El barrio extramuros creado en 1478: calle Paneras, antigua sinagoga del Palacio de la Isla y oficios de la aljama",
    "tematica": "Esencia, Patrimonio, Cultura Sefardí y Urbanismo Histórico",
    "descripcion": "Recorrido por el entorno extramuros junto a la Plaza Mayor donde, a partir de 1478, se formó la Judería Nueva (calles Paneras y de la Cruz) acogiendo además a familias judías llegadas tras los pogromos de 1391 y la expulsión de Andalucía en 1483.",
    "publico": "Público general, familias, turismo cultural y personas con movilidad reducida.",
    "duracion": "1 hora y 30 minutos",
    "distancia": "1,5 km",
    "dificultad": "Baja (Urbana llana)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Accesible (PMR) - Trazado urbano regularizado extramuros alrededor de la Plaza Mayor y Plaza de la Concepción.",
    "inicio_final": "Inicio en Plaza Mayor (junto al Arco de la Estrella) / Final en calles Ríos Verdes y Andrada",
    "numero_paradas": 8,
    "bg_gradient": "linear-gradient(135deg, #9d174d 0%, #4c1d95 100%)",
    "mapa": {
      "viewBox": "0 0 1040 380",
      "svgPath": "M 95,198 C 156,198 156,254 216,254 C 277,254 277,244 338,244 C 398,244 398,179 459,179 C 520,179 520,136 581,136 C 642,136 642,166 702,166 C 763,166 763,233 824,233 C 884,233 884,258 945,258",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 198,
          "name": "Plaza Mayor",
          "label_y": 164
        },
        {
          "num": 2,
          "x": 216,
          "y": 254,
          "name": "Calle Paneras",
          "label_y": 298
        },
        {
          "num": 3,
          "x": 338,
          "y": 244,
          "name": "Palacio de la Isla · A…",
          "label_y": 210
        },
        {
          "num": 4,
          "x": 459,
          "y": 179,
          "name": "Casa Marqués de Camarena",
          "label_y": 223
        },
        {
          "num": 5,
          "x": 581,
          "y": 136,
          "name": "Palacio de Galarza",
          "label_y": 102
        },
        {
          "num": 6,
          "x": 702,
          "y": 166,
          "name": "Iglesia y Convento de…",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 824,
          "y": 233,
          "name": "Palacio de los Duques…",
          "label_y": 199
        },
        {
          "num": 8,
          "x": 945,
          "y": 258,
          "name": "Ríos Verdes y Andrada",
          "label_y": 302
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Plaza Mayor y casas junto al Arco de la Estrella",
        "tiempo": "00:00 - 00:12",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Viviendas junto al Arco de la Estrella habitadas por judíos como Haim Alvelia y Samuel Ben Sentó (Semtob)."
      },
      {
        "parada": 2,
        "titulo": "Calle Paneras",
        "tiempo": "00:15 - 00:25",
        "distancia_tramo": "0,2 km",
        "descripcion": "Eje central junto con la calle de la Cruz del barrio formado en 1478 para la población judía extramuros."
      },
      {
        "parada": 3,
        "titulo": "Palacio de la Isla. Antigua Sinagoga · Ermita de la Cruz",
        "tiempo": "00:28 - 00:42",
        "distancia_tramo": "0,2 km",
        "descripcion": "Palacio renacentista del siglo XVI con detalles manieristas y góticos levantado sobre la sinagoga de la Judería Nueva."
      },
      {
        "parada": 4,
        "titulo": "Casa Marqués de Camarena",
        "tiempo": "00:45 - 00:55",
        "distancia_tramo": "0,2 km",
        "descripcion": "Palacio de diversas épocas (siglos XV al XVIII) perteneciente a la familia Carvajal, emparentada con Manuel Godoy."
      },
      {
        "parada": 5,
        "titulo": "Palacio de Galarza",
        "tiempo": "00:58 - 01:06",
        "distancia_tramo": "0,2 km",
        "descripcion": "Ubicado en la calle General Ezponda, reformado en el siglo XVI en estilo plateresco por el Obispo Galarza."
      },
      {
        "parada": 6,
        "titulo": "Iglesia y Convento de Santo Domingo",
        "tiempo": "01:08 - 01:18",
        "distancia_tramo": "0,25 km",
        "descripcion": "Conjunto franciscano del siglo XVI con portada de medio punto, planta de cruz latina y retablo mayor del siglo XVII."
      },
      {
        "parada": 7,
        "titulo": "Palacio de los Duques de Abrantes",
        "tiempo": "01:20 - 01:28",
        "distancia_tramo": "0,25 km",
        "descripcion": "Austero palacio del siglo XVI en la popular Plaza del Duque con elementos góticos y torre defensiva con gran matacán."
      },
      {
        "parada": 8,
        "titulo": "Calles Ríos Verdes y Andrada · Gremios de la Aljama",
        "tiempo": "01:30 - 01:40",
        "distancia_tramo": "0,2 km (Final)",
        "descripcion": "Memoria de la organización socioeconómica de los judíos cacereños, dedicados a oficios artesanos, comercio y medicina."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Plaza Mayor",
        "tiempo_parada": "12 min",
        "claves": "En el siglo XV Extremadura acogió a judíos huidos de los pogromos de 1391 y, en 1483, a los expulsados de Córdoba, Sevilla y Cádiz, incrementando las juderías cacereñas.",
        "audio_texto": "En la Plaza Mayor, junto al Arco de la Estrella, vivieron vecinos judíos documentados como Haim Alvelia y Samuel Ben Sentó. En el siglo XV Cáceres fue tierra de acogida para familias llegadas de toda Castilla y Andalucía.",
        "curiosidad": "La presencia de familias procedentes de Córdoba, Sevilla y Cádiz a partir de 1483 revitalizó el comercio de la villa."
      },
      {
        "num": 2,
        "nombre": "Calle Paneras",
        "tiempo_parada": "10 min",
        "claves": "Ubicada junto a la Plaza Mayor y fuera de la muralla, estructuró la vida cotidiana de la Judería Nueva.",
        "audio_texto": "Las actuales calles Paneras y de la Cruz conformaron la Judería Nueva, establecida a partir de 1478 extramuros de la ciudad monumental.",
        "curiosidad": "Su trazado próximo a la Plaza Mayor facilitaba la actividad artesanal y comercial de sus moradores."
      },
      {
        "num": 3,
        "nombre": "Palacio de la Isla · Antigua Sinagoga",
        "tiempo_parada": "14 min",
        "claves": "Tras 1492 la sinagoga se transformó en Ermita de la Cruz y luego en palacio de los Blázquez-Mogollón, Marqueses de la Isla. Horario: L-V 10:00-14:00 y 17:30-20:30; Sábados 10:00-14:00.",
        "audio_texto": "El Palacio de la Isla se levanta en el mismo solar que ocupó la sinagoga de la Judería Nueva, transformada después en Ermita de la Cruz. Su portada renacentista con sillares almohadillados es una joya del siglo XVI.",
        "curiosidad": "Actualmente es un activo espacio cultural municipal con exposiciones abiertas al público."
      },
      {
        "num": 4,
        "nombre": "Casa Marqués de Camarena",
        "tiempo_parada": "10 min",
        "claves": "Hoy alberga la sede del Colegio Oficial de Arquitectos de Extremadura y acoge actividades culturales.",
        "audio_texto": "La Casa del Marqués de Camarena perteneció a la familia Carvajal, pariente de Manuel Godoy, primer ministro de Carlos IV. Hoy es la sede del Colegio de Arquitectos.",
        "curiosidad": "Su patio y galerías son escenario habitual de exposiciones de arquitectura y diseño."
      },
      {
        "num": 5,
        "nombre": "Palacio de Galarza",
        "tiempo_parada": "8 min",
        "claves": "Destacan su ventana de esquina plateresca en la torre y su patio interior de columnas.",
        "audio_texto": "En la calle General Ezponda encontramos el Palacio de Galarza, con su inconfundible ventana de esquina plateresca y patio columnado.",
        "curiosidad": "En la memoria popular cacereña su torre recibe el nombre de Torre de los Trucos."
      },
      {
        "num": 6,
        "nombre": "Iglesia y Convento de Santo Domingo",
        "tiempo_parada": "10 min",
        "claves": "Sobre la portada figura una hornacina con la Virgen de la Inmaculada; el retablo mayor está presidido por una imagen policromada de Santo Domingo (mediados del XVIII).",
        "audio_texto": "La Iglesia y Convento de Santo Domingo, de la Orden Franciscana, se levantó en el siglo XVI y custodia en su interior un notable retablo mayor del siglo XVII.",
        "curiosidad": "Su planta de cruz latina presenta capillas entre contrafuertes y presbiterio ochavado."
      },
      {
        "num": 7,
        "nombre": "Palacio de los Duques de Abrantes",
        "tiempo_parada": "8 min",
        "claves": "Edificio señorial extramuros rehabilitado actualmente como residencia de estudiantes.",
        "audio_texto": "En la Plaza del Duque se alza el austero Palacio de los Duques de Abrantes, cuya torre conserva un imponente matacán defensivo de tradición gótica.",
        "curiosidad": "A pesar de estar situado fuera de las murallas, mantiene la fisonomía fortificada de las casas nobles intramuros."
      },
      {
        "num": 8,
        "nombre": "Ríos Verdes y Andrada",
        "tiempo_parada": "10 min",
        "claves": "Al tener prohibida la posesión de tierras, prosperaban por su trabajo como plateros, jubeteros, sastres, herreros, zapateros, curtidores o médicos como el rabí Yuçe (1478).",
        "audio_texto": "Terminamos en las calles Ríos Verdes y Andrada recordando cómo la prosperidad en la aljama dependía del oficio y el prestigio profesional, desde artesanos y zapateros hasta médicos como el rabí Yuçe.",
        "curiosidad": "En la organización de la aljama, el éxito profesional permitía alcanzar puestos relevantes independientemente del título de linaje."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🏛️",
        "nombre": "Palacio de la Isla",
        "desc": "Lunes a viernes 10:00-14:00 y 17:30-20:30 h; sábados 10:00-14:00 h."
      },
      {
        "icono": "📐",
        "nombre": "Colegio de Arquitectos (Casa Camarena)",
        "desc": "Espacio expositivo y cultural en el entorno de la Plaza Mayor."
      },
      {
        "icono": "♿",
        "nombre": "Entorno comercial accesible",
        "desc": "Calles peatonales llanas, bancos, bares y comercios locales."
      }
    ],
    "recomendaciones": [
      "Aprovechar el horario de apertura del Palacio de la Isla para visitar su patio y exposiciones.",
      "Ideal para realizar junto con la Ruta 5 (Judería Vieja) en una misma mañana o tarde."
    ],
    "sostenibilidad": [
      "Recorrido 100% peatonal por el centro histórico y comercial de Cáceres.",
      "Dinamización del comercio de proximidad y puesta en valor de la convivencia histórica."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-7",
    "slug": "ruta-eclesiastica-conventual",
    "file": "routes/ruta-07-eclesiastica-conventual.html",
    "pdf": "routes/RUTAS/Ruta_Eclesiastica_y_conventual.pdf",
    "nombre": "7. Ruta Eclesiástica y Conventual",
    "eslogan": "Iglesias, ermitas, conventos de clausura y retablos maestros desde el siglo XIII hasta el Barroco",
    "tematica": "Patrimonio, Arte Sacro y Arquitectura Religiosa",
    "descripcion": "La historia de Cáceres está íntimamente unida a las religiones que convivieron entre sus muros y a una red que llegó a contar con hasta 24 ermitas desde la Edad Media. Esta ruta recorre nueve templos esenciales, desde la Concatedral de Santa María y San Mateo hasta los conventos de clausura de Santa Clara y San Pablo.",
    "publico": "Público general, amantes del arte sacro, escultura renacentista y barroca, y turismo cultural.",
    "duracion": "2 horas y 30 minutos",
    "distancia": "2,5 km",
    "dificultad": "Baja (Urbana con cuestas suaves)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Parcialmente accesible - Calles urbanas accesibles y tramos empedrados en el interior monumental.",
    "inicio_final": "Inicio en Iglesia de San Juan Bautista / Final en Convento de Santo Domingo",
    "numero_paradas": 9,
    "bg_gradient": "linear-gradient(135deg, #6d28d9 0%, #3b0764 100%)",
    "mapa": {
      "viewBox": "0 0 1040 380",
      "svgPath": "M 95,198 C 148,198 148,254 201,254 C 254,254 254,244 308,244 C 361,244 361,179 414,179 C 467,179 467,136 520,136 C 573,136 573,166 626,166 C 679,166 679,233 732,233 C 786,233 786,258 839,258 C 892,258 892,211 945,211",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 198,
          "name": "Iglesia de San Juan Ba…",
          "label_y": 164
        },
        {
          "num": 2,
          "x": 201,
          "y": 254,
          "name": "Ermita de la Soledad",
          "label_y": 298
        },
        {
          "num": 3,
          "x": 308,
          "y": 244,
          "name": "Convento de Santa Clara",
          "label_y": 210
        },
        {
          "num": 4,
          "x": 414,
          "y": 179,
          "name": "Iglesia de San Mateo",
          "label_y": 223
        },
        {
          "num": 5,
          "x": 520,
          "y": 136,
          "name": "Convento de San Pablo",
          "label_y": 102
        },
        {
          "num": 6,
          "x": 626,
          "y": 166,
          "name": "Iglesia de San Francis…",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 732,
          "y": 233,
          "name": "Concatedral de Santa M…",
          "label_y": 199
        },
        {
          "num": 8,
          "x": 839,
          "y": 258,
          "name": "Iglesia de Santiago",
          "label_y": 302
        },
        {
          "num": 9,
          "x": 945,
          "y": 211,
          "name": "Convento de Santo Domi…",
          "label_y": 177
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Iglesia de San Juan Bautista o de los Ovejeros",
        "tiempo": "00:00 - 00:15",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Templo del siglo XIII reformado en los siglos XIV, XV y XVII, vinculado históricamente a los ganaderos trashumantes."
      },
      {
        "parada": 2,
        "titulo": "Ermita de la Soledad",
        "tiempo": "00:20 - 00:32",
        "distancia_tramo": "0,35 km",
        "descripcion": "Sencilla ermita rectangular construida sobre un antiguo hospital de los siglos XIII y XIV, sede de una de las cofradías más antiguas de Cáceres."
      },
      {
        "parada": 3,
        "titulo": "Convento de Santa Clara",
        "tiempo": "00:35 - 00:47",
        "distancia_tramo": "0,15 km",
        "descripcion": "Convento iniciado en 1593 con portada barroca de 1664 de acentos manieristas y blasones."
      },
      {
        "parada": 4,
        "titulo": "Iglesia de San Mateo",
        "tiempo": "00:52 - 01:08",
        "distancia_tramo": "0,3 km",
        "descripcion": "Levantada en el siglo XVI probablemente sobre la antigua mezquita mayor, con portada plateresca y casi 300 años de obras."
      },
      {
        "parada": 5,
        "titulo": "Convento de San Pablo",
        "tiempo": "01:10 - 01:20",
        "distancia_tramo": "0,1 km",
        "descripcion": "Beaterio fundado en el siglo XV y erigido luego en convento con portada gótica, aún habitado por monjas clarisas."
      },
      {
        "parada": 6,
        "titulo": "Iglesia de San Francisco Javier y Centro de la Semana Santa",
        "tiempo": "01:24 - 01:40",
        "distancia_tramo": "0,2 km",
        "descripcion": "Templo barroco jesuita finalizado en 1752 con imponente fachada de dos torres-campanario, aljibe subterráneo y cripta musealizada."
      },
      {
        "parada": 7,
        "titulo": "Concatedral de Santa María",
        "tiempo": "01:44 - 02:02",
        "distancia_tramo": "0,25 km",
        "descripcion": "Principal templo de Cáceres, iniciado tras la conquista de Alfonso IX en 1229 y culminado hacia 1550 entre el románico, gótico y renacimiento."
      },
      {
        "parada": 8,
        "titulo": "Iglesia de Santiago",
        "tiempo": "02:08 - 02:22",
        "distancia_tramo": "0,5 km",
        "descripcion": "Templo gótico-renacentista con portadas enmarcadas por alfiz y el extraordinario retablo mayor de Alonso de Berruguete."
      },
      {
        "parada": 9,
        "titulo": "Convento de Santo Domingo",
        "tiempo": "02:28 - 02:40",
        "distancia_tramo": "0,65 km (Final)",
        "descripcion": "Templo franciscano del siglo XVI de planta de cruz latina, capillas entre contrafuertes y retablo mayor del siglo XVII."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Iglesia de San Juan Bautista",
        "tiempo_parada": "15 min",
        "claves": "En los años sesenta se recuperó su sobriedad original; sobresale la Capilla de las Reliquias con portada plateresca de querubines y columnas abalaustradas, y reja del siglo XVI.",
        "audio_texto": "Iniciamos la ruta en San Juan Bautista, llamada antiguamente de los Ovejeros porque en su plaza se asentaban los ganaderos trashumantes. No deje de admirar la portada plateresca de la Capilla de las Reliquias.",
        "curiosidad": "Su sobrenombre «de los Ovejeros» testimonia la importancia de la Mesta y la trashumancia en la economía cacereña."
      },
      {
        "num": 2,
        "nombre": "Ermita de la Soledad",
        "tiempo_parada": "12 min",
        "claves": "Portada con escultura de la Virgen de la Soledad; retablo barroco interior con imagen del siglo XVII. Desde 1470 es sede de la Ilustre y Real Cofradía de la Soledad y el Santo Entierro.",
        "audio_texto": "La Ermita de la Soledad se levanta sobre un hospital medieval y acoge desde 1470 a una de las cofradías más antiguas y arraigadas de la Semana Santa cacereña.",
        "curiosidad": "Su cofradía conserva más de cinco siglos y medio de historia ininterrumpida desde 1470."
      },
      {
        "num": 3,
        "nombre": "Convento de Santa Clara",
        "tiempo_parada": "12 min",
        "claves": "En el interior sobresalen el retablo mayor de madera dorada y diversas pinturas de época barroca.",
        "audio_texto": "Muy próximo a la Soledad se encuentra el Convento de Santa Clara, comenzado en 1593, cuya portada de 1664 combina barroco, manierismo y heráldica.",
        "curiosidad": "Forma un conjunto conventual muy sereno extramuros del lienzo sur de la muralla."
      },
      {
        "num": 4,
        "nombre": "Iglesia de San Mateo",
        "tiempo_parada": "16 min",
        "claves": "Retablo mayor en pino sin policromar (1766, Vicente Barbadillo). La Capilla de los Sande (sacristía) conserva bóveda gótica estrellada. Alberga sepulturas de Ovando, Golfines, Paredes y Saavedra.",
        "audio_texto": "En el punto más alto de la ciudad amurallada se alza San Mateo, posiblemente sobre la mezquita islámica. Su interior acoge enterramientos de las grandes familias nobles cacereñas y un retablo en pino de 1766.",
        "curiosidad": "La construcción del templo se prolongó durante casi tres siglos, superponiendo soluciones góticas, platerescas y barrocas."
      },
      {
        "num": 5,
        "nombre": "Convento de San Pablo",
        "tiempo_parada": "10 min",
        "claves": "Mantiene viva la clausura tradicional en pleno corazón monumental de Cáceres.",
        "audio_texto": "Junto a la Plaza de San Mateo, el Convento de San Pablo conserva su portada gótica del siglo XV y sigue siendo hogar de las monjas clarisas.",
        "curiosidad": "Sus dulces conventuales artesanales son una de las tradiciones más apreciadas por vecinos y visitantes."
      },
      {
        "num": 6,
        "nombre": "Iglesia de San Francisco Javier",
        "tiempo_parada": "16 min",
        "claves": "Bajo el crucero reposa su fundador, Francisco Cristóbal de Vargas Figueroa y Sande. La Cripta acoge el Centro de Divulgación de la Semana Santa y acceso a la cisterna (10:00-14:00 y 16:30-19:30 inv. / 17:30-20:30 ver.).",
        "audio_texto": "La Iglesia de San Francisco Javier domina la Plaza de San Jorge con sus dos torres barrocas. En su cripta se descubre la Semana Santa cacereña a través de sus sonidos, aromas y pasos, además de un aljibe del siglo XVIII.",
        "curiosidad": "En el subsuelo del templo se conserva un aljibe natural visitable desde la Cuesta de la Compañía."
      },
      {
        "num": 7,
        "nombre": "Concatedral de Santa María",
        "tiempo_parada": "18 min",
        "claves": "Planta rectangular de tres naves con arcos apuntados y bóvedas de crucería. Destaca su retablo mayor del siglo XVI en cedro y pino sin policromar (Asunción de la Virgen, Roque Balduque y Guillén Ferrant).",
        "audio_texto": "La Concatedral de Santa María es el templo mayor de Cáceres. Su joya interior es el retablo renacentista de cedro y pino sin policromar tallado por Roque Balduque y Guillén Ferrant.",
        "curiosidad": "En la esquina exterior de la fachada se encuentra la célebre estatua de San Pedro de Alcántara, cuyos pies suelen tocar los visitantes."
      },
      {
        "num": 8,
        "nombre": "Iglesia de Santiago",
        "tiempo_parada": "14 min",
        "claves": "Nave única de bóvedas de crucería y amplio coro; retablo mayor encargado en 1557 a Berruguete e instalado en 1570.",
        "audio_texto": "En la Plaza de Santiago admiramos sus portadas góticas con alfiz y el retablo mayor diseñado por Alonso de Berruguete, cumbre del manierismo español.",
        "curiosidad": "Conserva la memoria de la Orden de los Fratres de Cáceres, fundada en 1170 por Fernando II de León, germen de la Orden de Santiago."
      },
      {
        "num": 9,
        "nombre": "Convento de Santo Domingo",
        "tiempo_parada": "12 min",
        "claves": "Presbiterio ochavado y retablo barroco presidido por la talla policromada de Santo Domingo.",
        "audio_texto": "Cerramos la ruta en el Convento de Santo Domingo, templo franciscano del siglo XVI que completa el mapa espiritual de la villa extramuros.",
        "curiosidad": "Su plaza delantera constituye uno de los espacios más amplios y sosegados del borde norte del casco histórico."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "⛪",
        "nombre": "Centro de Divulgación Semana Santa",
        "desc": "Cripta de San Francisco Javier (Cuesta de la Compañía): 10:00-14:00 y 16:30-19:30 (inv.) / 17:30-20:30 (ver.)."
      },
      {
        "icono": "🍬",
        "nombre": "Repostería conventual",
        "desc": "Torno de dulces tradicionales en el Convento de San Pablo."
      },
      {
        "icono": "ℹ️",
        "nombre": "Horarios de culto",
        "desc": "Respetar los horarios litúrgicos en Concatedral de Santa María, San Mateo, San Juan y Santiago."
      }
    ],
    "recomendaciones": [
      "Guardar silencio y respetar el culto al visitar templos y conventos en activo.",
      "Comprobar los horarios de visita turística de la Concatedral de Santa María y la Cripta de San Francisco Javier.",
      "Llevar calzado cómodo para recorrer el eje completo desde San Juan hasta Santo Domingo."
    ],
    "sostenibilidad": [
      "Itinerario peatonal que impulsa el turismo cultural respetuoso con las comunidades religiosas locales.",
      "Apoyo a la economía tradicional mediante la repostería artesanal conventual."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-8",
    "slug": "ruta-agua-ribera-marco",
    "file": "routes/ruta-08-agua-ribera-marco.html",
    "pdf": "routes/RUTAS/RUTA_La_Ribera_del_Marco.pdf",
    "nombre": "8. Ruta del Agua · La Ribera del Marco",
    "eslogan": "Aljibes, cisternas defensivas, fuentes históricas, huertas centenarias y el pulso artesanal de la Ribera",
    "tematica": "Ecoturismo, Patrimonio, Hidráulica Histórica y Paisaje",
    "descripcion": "Recorrido por la cultura del agua en Cáceres: desde los aljibes monumentales de San Francisco Javier y el Museo de Cáceres hasta las fuentes de Concejo y Rocha, las huertas regadas desde las Ordenanzas de 1494, la Ribera de Curtidores y la tradicional Calle Caleros.",
    "publico": "Público general, familias, aficionados al ecoturismo, la etnografía y la ingeniería hidráulica histórica.",
    "duracion": "2 horas y 15 minutos",
    "distancia": "3,2 km",
    "dificultad": "Media-Baja (Descenso monumental y ribera llana)",
    "dificultad_class": "diff-media",
    "accesibilidad": "Mixta - Acceso monumental con cuestas; tramo de huertas y Ribera del Marco llano y practicable.",
    "inicio_final": "Inicio en Iglesia de San Francisco Javier / Final en Calle Caleros",
    "numero_paradas": 9,
    "bg_gradient": "linear-gradient(135deg, #0284c7 0%, #0f766e 100%)",
    "mapa": {
      "viewBox": "0 0 1040 380",
      "svgPath": "M 95,198 C 148,198 148,254 201,254 C 254,254 254,244 308,244 C 361,244 361,179 414,179 C 467,179 467,136 520,136 C 573,136 573,166 626,166 C 679,166 679,233 732,233 C 786,233 786,258 839,258 C 892,258 892,211 945,211",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 198,
          "name": "Iglesia de San Francis…",
          "label_y": 164
        },
        {
          "num": 2,
          "x": 201,
          "y": 254,
          "name": "Aljibe Árabe · Museo d…",
          "label_y": 298
        },
        {
          "num": 3,
          "x": 308,
          "y": 244,
          "name": "Baluarte de los Pozos",
          "label_y": 210
        },
        {
          "num": 4,
          "x": 414,
          "y": 179,
          "name": "La Cisterna de San Roque",
          "label_y": 223
        },
        {
          "num": 5,
          "x": 520,
          "y": 136,
          "name": "Fuente Concejo",
          "label_y": 102
        },
        {
          "num": 6,
          "x": 626,
          "y": 166,
          "name": "Fuente Rocha o de los…",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 732,
          "y": 233,
          "name": "Huertas en la Ribera d…",
          "label_y": 199
        },
        {
          "num": 8,
          "x": 839,
          "y": 258,
          "name": "Ribera de Curtidores",
          "label_y": 302
        },
        {
          "num": 9,
          "x": 945,
          "y": 211,
          "name": "La Calle Caleros",
          "label_y": 177
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Iglesia de San Francisco Javier y Cisterna del s. XVIII",
        "tiempo": "00:00 - 00:20",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Templo barroco jesuita (1752) que esconde en su subsuelo un aljibe natural y una cisterna visitable desde la Cripta."
      },
      {
        "parada": 2,
        "titulo": "El Aljibe Árabe. El Museo de Cáceres",
        "tiempo": "00:25 - 00:45",
        "distancia_tramo": "0,25 km",
        "descripcion": "Gran aljibe almohade de los siglos XI-XII bajo el Palacio de las Veletas, con cinco naves de arcos de herradura."
      },
      {
        "parada": 3,
        "titulo": "Baluarte de los Pozos",
        "tiempo": "00:50 - 01:02",
        "distancia_tramo": "0,3 km",
        "descripcion": "Torre almohade del siglo XII accesible desde una casa de la Judería Vieja que protegía pozos estratégicos."
      },
      {
        "parada": 4,
        "titulo": "La Cisterna de San Roque",
        "tiempo": "01:06 - 01:18",
        "distancia_tramo": "0,25 km",
        "descripcion": "Primitiva torre coracha cuya cisterna inferior podía almacenar hasta 130 m³ de agua incluso en sequía."
      },
      {
        "parada": 5,
        "titulo": "Fuente Concejo",
        "tiempo": "01:22 - 01:34",
        "distancia_tramo": "0,35 km",
        "descripcion": "Desde la segunda mitad del siglo XV, la fuente de mayor producción de agua de Cáceres."
      },
      {
        "parada": 6,
        "titulo": "Fuente Rocha o de los Curtidores",
        "tiempo": "01:40 - 01:50",
        "distancia_tramo": "0,5 km",
        "descripcion": "Fuente histórica ampliada a finales del siglo XIX junto a las antiguas tenerías de la Ribera."
      },
      {
        "parada": 7,
        "titulo": "Huertas en la Ribera del Marco",
        "tiempo": "01:55 - 02:08",
        "distancia_tramo": "0,6 km",
        "descripcion": "Franja fértil de 6,8 km y unas 33 hectáreas regada por una de las comunidades de regantes más antiguas de España."
      },
      {
        "parada": 8,
        "titulo": "Ribera de Curtidores",
        "tiempo": "02:12 - 02:22",
        "distancia_tramo": "0,5 km",
        "descripcion": "Antiguo eje preindustrial etnográfico donde trabajaban molineros, hortelanos, labradores y curtidores."
      },
      {
        "parada": 9,
        "titulo": "La Calle Caleros",
        "tiempo": "02:25 - 02:35",
        "distancia_tramo": "0,45 km (Final)",
        "descripcion": "Una de las calles más populares de Cáceres, antigua residencia del gremio de caleros, con abundantes portadas ojivales de cantería."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Iglesia de San Francisco Javier",
        "tiempo_parada": "20 min",
        "claves": "Acceso por la Cuesta de la Compañía al Centro de Divulgación de la Semana Santa y la cisterna-aljibe del siglo XVIII. Horario: 10:00-14:00 y 16:30-19:30 (inv.) / 17:30-20:30 (ver.).",
        "audio_texto": "Comenzamos la Ruta del Agua en San Francisco Javier. Bajo este templo barroco jesuita de 1752 se conserva un aljibe natural y una cisterna visitable desde la cripta.",
        "curiosidad": "Bajo el crucero se halla la sepultura de su fundador, don Francisco Cristóbal de Vargas Figueroa y Sande."
      },
      {
        "num": 2,
        "nombre": "Aljibe Árabe · Museo de Cáceres",
        "tiempo_parada": "20 min",
        "claves": "Sigue recogiendo la lluvia del patio renacentista superior. Uno de los aljibes hispano-árabes más grandes e importantes del mundo. Horario: 9:00-14:30 y 17:00-20:00 (ver.) / 16:00-19:00 (inv.); domingos 10:15-14:30; lunes cerrado.",
        "audio_texto": "El Aljibe Árabe del Museo de Cáceres es el corazón hidráulico de la antigua alcazaba almohade. La luz cenital ilumina sus cinco naves sobre arcos de herradura.",
        "curiosidad": "El Palacio de las Veletas fue reestructurado en el siglo XV y remodelado en los XVII y XVIII respetando intacta la cámara del aljibe."
      },
      {
        "num": 3,
        "nombre": "Baluarte de los Pozos",
        "tiempo_parada": "12 min",
        "claves": "Garantizaba el agua a la población durante asedios militares. Horario: 10:00-14:00 y 17:30-20:30 (ver.) / 16:30-19:30 (inv.); lunes cerrado.",
        "audio_texto": "En el Barrio de San Antonio, el Baluarte de los Pozos demuestra el valor estratégico del agua en la defensa medieval de Cáceres.",
        "curiosidad": "Conecta directamente el casco amurallado con la ladera que baja hacia la Cisterna de San Roque."
      },
      {
        "num": 4,
        "nombre": "La Cisterna de San Roque",
        "tiempo_parada": "12 min",
        "claves": "Desde el exterior se distingue su bóveda construida con sillares romanos reutilizados.",
        "audio_texto": "La Cisterna de San Roque formaba parte de una torre coracha diseñada para asegurar un caudal abundante en épocas de sequía, con capacidad para ciento treinta metros cúbicos.",
        "curiosidad": "Sus sillares romanos reutilizados enlazan dos mil años de ingeniería hidráulica en un mismo muro."
      },
      {
        "num": 5,
        "nombre": "Fuente Concejo",
        "tiempo_parada": "12 min",
        "claves": "En el siglo XVIII llegaron a extraerse de sus caños hasta 13.000 cántaros de agua en tan solo 24 horas.",
        "audio_texto": "Fuente Concejo fue el gran surtidor de la ciudad desde finales del siglo XV. En el siglo XVIII se contabilizaron hasta trece mil cántaros extraídos en un solo día.",
        "curiosidad": "Situada a los pies del Arco del Cristo, era paso obligado de aguadores, hortelanos y caballerías."
      },
      {
        "num": 6,
        "nombre": "Fuente Rocha o de los Curtidores",
        "tiempo_parada": "10 min",
        "claves": "Clausurada en 1964 y restaurada en 1993, volvió a manar agua por sus caños en el año 2006.",
        "audio_texto": "La Fuente Rocha o de los Curtidores refleja la recuperación del patrimonio hídrico cacereño: tras décadas seca desde 1964, volvió a brotar en 2006.",
        "curiosidad": "Su doble nombre recuerda la intensa actividad de los curtidores en esta orilla de la Ribera."
      },
      {
        "num": 7,
        "nombre": "Huertas en la Ribera del Marco",
        "tiempo_parada": "13 min",
        "claves": "La Ordenanza del agua de la Ribera promulgada por los Reyes Católicos el 1 de enero de 1494 certificó esta larga tradición agrícola.",
        "audio_texto": "Caminamos entre las huertas de la Ribera del Marco, cuyas ordenanzas de riego fueron promulgadas por los Reyes Católicos en 1494 para gestionar treinta y tres hectáreas de cultivo.",
        "curiosidad": "Su comunidad de regantes figura entre las más antiguas documentadas en toda España."
      },
      {
        "num": 8,
        "nombre": "Ribera de Curtidores",
        "tiempo_parada": "10 min",
        "claves": "Todo un tejido artesanal movido y abastecido por el arroyo del Marco y sus acequias.",
        "audio_texto": "La Ribera de Curtidores conserva la memoria de molineros, tenerías, lavaderos y labradores que conformaron el tejido preindustrial de Cáceres.",
        "curiosidad": "Los gremios que necesitaban abundante agua y espacio se concentraron históricamente en esta vertiente oriental."
      },
      {
        "num": 9,
        "nombre": "La Calle Caleros",
        "tiempo_parada": "10 min",
        "claves": "Celebrada en la canción folclórica cacereña «El Redoble» y muy vinculada a la devoción a la Virgen de la Montaña, patrona de la ciudad.",
        "audio_texto": "Finalizamos en la entrañable Calle Caleros, salpicada de portadas ojivales de cantería e inmortalizada en la canción folclórica El Redoble.",
        "curiosidad": "Los caleros elaboraban la cal que blanqueaba las viviendas populares y consolidaba muros en toda la ciudad."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🏛️",
        "nombre": "Museo de Cáceres y Cripta San Francisco Javier",
        "desc": "Espacios museísticos con aljibes históricos visitables (consultar cierre lunes)."
      },
      {
        "icono": "🚰",
        "nombre": "Fuentes históricas y paseos",
        "desc": "Entorno ajardinado junto a Fuente Concejo y corredor peatonal de la Ribera."
      },
      {
        "icono": "🌿",
        "nombre": "Observación natural",
        "desc": "Aves ribereñas, huertas tradicionales y vegetación de galería en la Ribera del Marco."
      }
    ],
    "recomendaciones": [
      "Llevar calzado cómodo para bajar desde el recinto amurallado hasta el fondo del valle de la Ribera.",
      "Ideal en primavera y otoño, cuando las huertas y el arroyo lucen en su máximo esplendor.",
      "Llevar botella reutilizable y respetar las parcelas de huerta privadas."
    ],
    "sostenibilidad": [
      "Sensibilización sobre el uso responsable del agua y la conservación de ecosistemas fluviales urbanos.",
      "Ruta 100% a pie sin impacto ambiental sobre el cinturón verde de Cáceres."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-9",
    "slug": "plaza-mayor-caceres",
    "file": "routes/ruta-09-plaza-mayor.html",
    "pdf": "routes/RUTAS/Ruta_La_Plaza_Mayor_de_Caceres.pdf",
    "nombre": "9. La Plaza Mayor",
    "eslogan": "El vestíbulo monumental de Cáceres: torres albarranas, soportales gremiales y corazón social desde la Edad Media",
    "tematica": "Esencia, Patrimonio, Urbanismo e Historia Social",
    "descripcion": "La Plaza Mayor es el vestíbulo del Cáceres amurallado y el eje de su expansión urbana desde finales de la Edad Media. Escenario de procesiones, fiestas, mercados y vida cotidiana, reúne en un solo espacio torres almohades, la muralla romana y medieval, el Ayuntamiento decimonónico, la Ermita de la Paz y los históricos soportales gremiales.",
    "publico": "Todos los públicos, familias, personas con movilidad reducida y visitantes en su primer contacto con Cáceres.",
    "duracion": "1 hora y 15 minutos",
    "distancia": "0,8 km",
    "dificultad": "Baja (Llana y totalmente peatonal)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Totalmente accesible (PMR) - Espacio peatonal amplio y nivelado en todo el perímetro de la plaza.",
    "inicio_final": "Recorrido circular con inicio en Ayuntamiento de Cáceres / Final en Los Soportales de la Plaza",
    "numero_paradas": 8,
    "bg_gradient": "linear-gradient(135deg, #c2410c 0%, #7c2d12 100%)",
    "mapa": {
      "viewBox": "0 0 1040 380",
      "svgPath": "M 95,198 C 156,198 156,254 216,254 C 277,254 277,244 338,244 C 398,244 398,179 459,179 C 520,179 520,136 581,136 C 642,136 642,166 702,166 C 763,166 763,233 824,233 C 884,233 884,258 945,258",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 198,
          "name": "Ayuntamiento de Cáceres",
          "label_y": 164
        },
        {
          "num": 2,
          "x": 216,
          "y": 254,
          "name": "Foro de los Balbos",
          "label_y": 298
        },
        {
          "num": 3,
          "x": 338,
          "y": 244,
          "name": "Torre de la Yerba",
          "label_y": 210
        },
        {
          "num": 4,
          "x": 459,
          "y": 179,
          "name": "La Muralla",
          "label_y": 223
        },
        {
          "num": 5,
          "x": 581,
          "y": 136,
          "name": "Torre de los Púlpitos",
          "label_y": 102
        },
        {
          "num": 6,
          "x": 702,
          "y": 166,
          "name": "Torre de Bujaco",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 824,
          "y": 233,
          "name": "Ermita de la Paz",
          "label_y": 199
        },
        {
          "num": 8,
          "x": 945,
          "y": 258,
          "name": "Los Soportales de la P…",
          "label_y": 302
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Ayuntamiento de Cáceres",
        "tiempo": "00:00 - 00:10",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Casa Consistorial construida en 1869 sobre el solar de la antigua cárcel de la villa."
      },
      {
        "parada": 2,
        "titulo": "Foro de los Balbos",
        "tiempo": "00:12 - 00:20",
        "distancia_tramo": "0,1 km",
        "descripcion": "Espacio emblemático junto a la muralla donde se reunía antiguamente el Concejo municipal."
      },
      {
        "parada": 3,
        "titulo": "Torre de la Yerba",
        "tiempo": "00:22 - 00:30",
        "distancia_tramo": "0,1 km",
        "descripcion": "Torre albarrana almohade del siglo XII construida en tapial y unida a la muralla mediante un muro defensivo."
      },
      {
        "parada": 4,
        "titulo": "La Muralla (Frente de la Plaza Mayor)",
        "tiempo": "00:32 - 00:42",
        "distancia_tramo": "0,1 km",
        "descripcion": "Lienzo defensivo de origen romano reconstruido por los almohades que marca la frontera entre intramuros y arrabal."
      },
      {
        "parada": 5,
        "titulo": "Torre de los Púlpitos",
        "tiempo": "00:44 - 00:52",
        "distancia_tramo": "0,1 km",
        "descripcion": "Torre cristiana de 16 m en sillería de piedra, unida por un arco-puente del siglo XVIII al Palacio de Mayoralgo."
      },
      {
        "parada": 6,
        "titulo": "Torre de Bujaco y Rondas de la Villa",
        "tiempo": "00:54 - 01:04",
        "distancia_tramo": "0,1 km",
        "descripcion": "Torre albarrana de 25 m (siglo XII) junto a la cual surgieron en 1303 las primeras viviendas extramuros (Rondas de la Villa)."
      },
      {
        "parada": 7,
        "titulo": "Ermita de la Paz",
        "tiempo": "01:06 - 01:14",
        "distancia_tramo": "0,1 km",
        "descripcion": "Antigua ermita de San Benito reconstruida en el siglo XVIII en estilo barroco, adosada a la Torre de Bujaco."
      },
      {
        "parada": 8,
        "titulo": "Los Soportales de la Plaza (Centro Gremial)",
        "tiempo": "01:16 - 01:25",
        "distancia_tramo": "0,2 km (Final)",
        "descripcion": "Galería porticada de la fachada oeste consolidada en el siglo XVI que acogió los gremios de comerciantes y artesanos."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Ayuntamiento de Cáceres",
        "tiempo_parada": "10 min",
        "claves": "Proyecto del arquitecto Ignacio M.ª de Michelena que preside el frente sur de la Plaza Mayor.",
        "audio_texto": "Iniciamos la visita en el Ayuntamiento de Cáceres, construido en 1869 según proyecto de Ignacio María de Michelena sobre el solar que ocupó la cárcel de la villa.",
        "curiosidad": "Su construcción consolidó definitivamente la Plaza Mayor como centro cívico y administrativo de la ciudad moderna."
      },
      {
        "num": 2,
        "nombre": "Foro de los Balbos",
        "tiempo_parada": "8 min",
        "claves": "Antes del edificio de 1869, aquí tenía su sede el antiguo Ayuntamiento; destaca su pilar monumental y la estatua del Genio Andrógino.",
        "audio_texto": "A escasos pasos, en el Foro de los Balbos, se reunía el antiguo Concejo de la villa antes de trasladarse al edificio actual.",
        "curiosidad": "Conecta la Plaza Mayor con la Plaza de Caldereros y el acceso a la Ciudad Monumental."
      },
      {
        "num": 3,
        "nombre": "Torre de la Yerba",
        "tiempo_parada": "8 min",
        "claves": "Realizada en tierra o adobe prensado (tapial) en la última gran reforma defensiva previa a la conquista leonesa.",
        "audio_texto": "La Torre de la Yerba es una torre albarrana almohade del siglo XII levantada con la técnica del tapial, precursora del encofrado contemporáneo.",
        "curiosidad": "Su posición adelantada permitía defender el lienzo de la muralla desde los flancos."
      },
      {
        "num": 4,
        "nombre": "La Muralla",
        "tiempo_parada": "10 min",
        "claves": "Guarda una estructura rectangular atravesada por Cardo y Decumano cuya confluencia era el foro en Santa María; en el siglo XVI separaba a nobles y clero (intramuros) del pueblo llano (arrabal).",
        "audio_texto": "El gran telón de fondo de la Plaza Mayor es la Muralla, nacida en época romana y reforzada por los almohades. Durante siglos marcó la frontera social entre la ciudad noble intramuros y el arrabal.",
        "curiosidad": "A lo largo de la historia se abrieron nuevos accesos como el Arco de la Estrella y el Postigo de Santa Ana."
      },
      {
        "num": 5,
        "nombre": "Torre de los Púlpitos",
        "tiempo_parada": "8 min",
        "claves": "Única torre añadida tras la conquista por el Reino de León; visitable a través de la Torre de Bujaco.",
        "audio_texto": "Construida en sillares de piedra tras la conquista cristiana, la Torre de los Púlpitos se comunica por un arco-puente con el Palacio de Mayoralgo.",
        "curiosidad": "Sus moradores utilizaban la torre como palco privilegiado para ver los festejos celebrados en la Plaza."
      },
      {
        "num": 6,
        "nombre": "Torre de Bujaco",
        "tiempo_parada": "10 min",
        "claves": "Alberga el Centro de Interpretación de las Tres Culturas. Horario: L-D 10:00-14:00 y 17:30-20:30 (verano) / 16:30-19:30 (invierno).",
        "audio_texto": "Junto a la Torre de Bujaco, icono de Cáceres de veinticinco metros, nacieron en 1303 las primeras casas fuera de la muralla conocidas como las Rondas de la Villa.",
        "curiosidad": "Desde su pasarela superior se obtienen algunas de las mejores vistas panorámicas de toda la Plaza Mayor."
      },
      {
        "num": 7,
        "nombre": "Ermita de la Paz",
        "tiempo_parada": "8 min",
        "claves": "Pórtico de tres arcos de medio punto con reja forjada por Juan de Acedo (1756) con el monograma IHS y águila bicéfala; retablo barroco con Virgen y Niño de Pedro Correa.",
        "audio_texto": "Adosada a Bujaco se abre la Ermita de la Paz, reconstruida en el siglo XVIII, con su pórtico de tres arcos y la reja de Juan de Acedo de 1756.",
        "curiosidad": "La cubierta del pórtico está resuelta en ladrillo y preside la escalinata de acceso hacia el Arco de la Estrella."
      },
      {
        "num": 8,
        "nombre": "Los Soportales de la Plaza",
        "tiempo_parada": "9 min",
        "claves": "Portal del Pan, Portal de la Botica, Portal de los Plateros, de los Escribanos, pintores, zapateros y sastres. En sus proximidades se ubicó en 1478 la Judería Nueva.",
        "audio_texto": "Cerramos el paseo bajo los Soportales de la Plaza Mayor, construidos en el siglo XVI como centro gremial del pan, la botica, los plateros y los escribanos.",
        "curiosidad": "Hoy continúan siendo el gran salón urbano de Cáceres, llenos de cafés, comercio local y vida social."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "ℹ️",
        "nombre": "Oficina de Turismo Municipal",
        "desc": "Situada en la propia Plaza Mayor, junto a la Torre de Bujaco."
      },
      {
        "icono": "♿",
        "nombre": "Accesibilidad total",
        "desc": "Pavimento llano, bancos y terrazas accesibles en todo el perímetro."
      },
      {
        "icono": "🍽️",
        "nombre": "Gastronomía bajo los soportales",
        "desc": "Amplia oferta de restauración tradicional extremeña y comercios locales."
      }
    ],
    "recomendaciones": [
      "Ideal como primera ruta introductoria al llegar a Cáceres.",
      "Subir a la Torre de Bujaco para observar la plaza y el conjunto monumental desde las alturas.",
      "Disfrutar de la iluminación nocturna de las torres y la muralla al anochecer."
    ],
    "sostenibilidad": [
      "Espacio peatonal libre de tráfico rodado que fomenta la convivencia y el comercio local.",
      "Punto de partida ideal para enlazar a pie con todas las rutas del casco histórico."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-10",
    "slug": "el-adarve-vuelta-muralla",
    "file": "routes/ruta-10-el-adarve.html",
    "pdf": "routes/RUTAS/Ruta_El_adarve_una_vuelta_a_la_muralla.pdf",
    "nombre": "10. El Adarve · Una vuelta a la muralla",
    "eslogan": "El camino de ronda interior que circunvala íntegro el recinto defensivo desde época romana",
    "tematica": "Patrimonio, Paisaje, Arquitectura Militar y Urbanismo",
    "descripcion": "El adarve es el camino interior que permitía recorrer las defensas para su inspección y movimiento estratégico de tropas a salvo de ataques exteriores. A pesar del paso de los siglos y la desaparición de las puertas de Coria y Mérida, Cáceres conserva de forma excepcional el trazado originario de su adarve de fundación romana.",
    "publico": "Público general, fotógrafos, amantes de la arquitectura militar y paseantes urbanos.",
    "duracion": "1 hora y 45 minutos",
    "distancia": "1,7 km",
    "dificultad": "Media-Baja (Recorrido perimetral con cuestas)",
    "dificultad_class": "diff-media",
    "accesibilidad": "Parcialmente accesible - Tramos empedrados y pendientes pronunciadas en el sector oriental junto a la Judería Vieja.",
    "inicio_final": "Recorrido circular con inicio en Arco de la Estrella / Final en Plaza de Caldereros",
    "numero_paradas": 9,
    "bg_gradient": "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)",
    "mapa": {
      "viewBox": "0 0 1040 380",
      "svgPath": "M 95,198 C 148,198 148,254 201,254 C 254,254 254,244 308,244 C 361,244 361,179 414,179 C 467,179 467,136 520,136 C 573,136 573,166 626,166 C 679,166 679,233 732,233 C 786,233 786,258 839,258 C 892,258 892,211 945,211",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 198,
          "name": "Arco de la Estrella y…",
          "label_y": 164
        },
        {
          "num": 2,
          "x": 201,
          "y": 254,
          "name": "El Palacio de Moctezuma",
          "label_y": 298
        },
        {
          "num": 3,
          "x": 308,
          "y": 244,
          "name": "Torre de Espaderos y P…",
          "label_y": 210
        },
        {
          "num": 4,
          "x": 414,
          "y": 179,
          "name": "Arco del Cristo o Puer…",
          "label_y": 223
        },
        {
          "num": 5,
          "x": 520,
          "y": 136,
          "name": "La Judería Vieja",
          "label_y": 102
        },
        {
          "num": 6,
          "x": 626,
          "y": 166,
          "name": "Palacio de los Pereros…",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 732,
          "y": 233,
          "name": "Hospital de los Caball…",
          "label_y": 199
        },
        {
          "num": 8,
          "x": 839,
          "y": 258,
          "name": "Arco de Santa Ana y Co…",
          "label_y": 302
        },
        {
          "num": 9,
          "x": 945,
          "y": 211,
          "name": "Plaza de Caldereros ·…",
          "label_y": 177
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "El Arco de la Estrella y el Palacio Episcopal",
        "tiempo": "00:00 - 00:14",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Puerta-arco construida en 1726 por Manuel de Larra Churriguera en forma oblicua para el paso de carruajes, junto al Palacio Episcopal del siglo XVI."
      },
      {
        "parada": 2,
        "titulo": "El Palacio de Moctezuma (Archivo Histórico Provincial)",
        "tiempo": "00:16 - 00:28",
        "distancia_tramo": "0,15 km",
        "descripcion": "Edificio de los siglos XIV-XV ampliado en los XVI-XVII por un nieto de Isabel de Moctezuma y el capitán cacereño Juan Cano Saavedra."
      },
      {
        "parada": 3,
        "titulo": "Torre de Espaderos y la Puerta de Coria",
        "tiempo": "00:30 - 00:40",
        "distancia_tramo": "0,15 km",
        "descripcion": "Torre bajomedieval (siglos XIV-XV) con matacán en esquina, ventana geminada y desmoche isabelino sobre el solar de la Puerta de Coria."
      },
      {
        "parada": 4,
        "titulo": "El Arco del Cristo o Puerta del Río",
        "tiempo": "00:45 - 00:55",
        "distancia_tramo": "0,3 km",
        "descripcion": "Única puerta romana original conservada, por donde se cree que entraba la Vía de la Plata hacia la ciudad y daba salida a la Ribera del Marco."
      },
      {
        "parada": 5,
        "titulo": "La Judería Vieja (Adarve de San Antonio)",
        "tiempo": "00:58 - 01:08",
        "distancia_tramo": "0,25 km",
        "descripcion": "Tramo oriental del adarve entre viviendas populares de una planta encaladas, chimeneas de ladrillo y cuestas con pretiles."
      },
      {
        "parada": 6,
        "titulo": "Palacio de los Pereros y La Puerta de Mérida",
        "tiempo": "01:12 - 01:22",
        "distancia_tramo": "0,25 km",
        "descripcion": "Casa-palacio con patio renacentista porticado de Pedro Marquina con gárgolas y escudos, junto al emplazamiento de la Puerta de Mérida (derribada en 1751)."
      },
      {
        "parada": 7,
        "titulo": "Hospital de los Caballeros",
        "tiempo": "01:24 - 01:32",
        "distancia_tramo": "0,15 km",
        "descripcion": "Edificio gótico de mampostería y sillería mandado construir en 1486 por Don Diego García de Ulloa."
      },
      {
        "parada": 8,
        "titulo": "El Arco de Santa Ana y el Palacio de los Condes de Adanero",
        "tiempo": "01:35 - 01:44",
        "distancia_tramo": "0,25 km",
        "descripcion": "Postigo del siglo XVIII con bóvedas de rosca de ladrillo junto al palacio manierista del siglo XVII de grandes sillares almohadillados."
      },
      {
        "parada": 9,
        "titulo": "Plaza de Caldereros. Palacio de la Generala",
        "tiempo": "01:46 - 01:55",
        "distancia_tramo": "0,2 km (Final)",
        "descripcion": "Cierre de la vuelta a la muralla ante el Palacio de la Generala (finales del XV - principios del XVI), con salida directa al Foro de los Balbos."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Arco de la Estrella y Palacio Episcopal",
        "tiempo_parada": "14 min",
        "claves": "Transformó la Puerta Nueva del siglo XV; en su interior aloja la Virgen de la Estrella y un farolillo. El Palacio Episcopal (obispo Pedro García de Galarza) luce medallones de un indio y una india en su portada almohadillada.",
        "audio_texto": "Entramos al adarve por el Arco de la Estrella, obra oblicua de Larra Churriguera en 1726 diseñada tras los pleitos de los carruajes, flanqueado por el Palacio Episcopal.",
        "curiosidad": "Los viajeros se encomendaban a la Virgen de la Estrella al salir de la ciudad y le agradecían el regreso al volver."
      },
      {
        "num": 2,
        "nombre": "El Palacio de Moctezuma",
        "tiempo_parada": "12 min",
        "claves": "Sus salones conservan pinturas al fresco de emperadores romanos, reyes mejicanos y ciudades europeas. Destaca su cúpula y la combinación de mampostería, ladrillo y granito. Hoy Archivo Histórico Provincial.",
        "audio_texto": "El Palacio de Moctezuma une Cáceres con América: fue promovido por el nieto de la princesa azteca Isabel de Moctezuma y el capitán Juan Cano. Hoy alberga el Archivo Histórico Provincial.",
        "curiosidad": "En sus salones interiores los frescos representan bustos de reyes mexicas junto a emperadores romanos."
      },
      {
        "num": 3,
        "nombre": "Torre de Espaderos y Puerta de Coria",
        "tiempo_parada": "10 min",
        "claves": "Al pie de la torre se distinguen sillares romanos pertenecientes a la muralla original.",
        "audio_texto": "Siguiendo el adarve norte llegamos a la Torre de Espaderos, vigilante de la desaparecida Puerta de Coria, donde se aprecia con nitidez el desmoche ordenado por Isabel la Católica.",
        "curiosidad": "La Puerta de Coria era la salida norte romana de Norba Caesarina."
      },
      {
        "num": 4,
        "nombre": "Arco del Cristo o Puerta del Río",
        "tiempo_parada": "10 min",
        "claves": "Conecta el Adarve del Cristo con la Judería Vieja y el valle de la Ribera.",
        "audio_texto": "En el flanco oriental cruzamos el Arco del Cristo, única puerta romana intacta del recinto, salida directa hacia el cauce de la Ribera del Marco.",
        "curiosidad": "Su ubicación permitía el abastecimiento rápido desde Fuente Concejo."
      },
      {
        "num": 5,
        "nombre": "La Judería Vieja",
        "tiempo_parada": "10 min",
        "claves": "Conserva intacta la fisonomía popular adaptada a los desniveles del terreno.",
        "audio_texto": "El adarve atraviesa la Judería Vieja entre casas encaladas de una planta, vanos irregulares y cuestas empinadas salvadas por pretiles.",
        "curiosidad": "Muchas de las viviendas de este tramo utilizan la propia muralla como pared trasera."
      },
      {
        "num": 6,
        "nombre": "Palacio de los Pereros y Puerta Mérida",
        "tiempo_parada": "10 min",
        "claves": "Combina distintas etapas constructivas con fachada adornada por los escudos de la familia Perero.",
        "audio_texto": "Girando hacia el sur alcanzamos el Palacio de los Pereros, cuyo patio renacentista con gárgolas y escudos es obra de Pedro Marquina, junto al lugar donde estuvo la Puerta de Mérida hasta 1751.",
        "curiosidad": "Pedro Marquina fue también el maestro autor del célebre balcón de esquina del Palacio de Godoy."
      },
      {
        "num": 7,
        "nombre": "Hospital de los Caballeros",
        "tiempo_parada": "8 min",
        "claves": "Dedicado a la hospitalidad y albergue de sacerdotes y estudiantes.",
        "audio_texto": "El Hospital de los Caballeros, fundado en 1486 por Diego García de Ulloa, ofrece un sobrio ejemplo de arquitectura gótica asistencial.",
        "curiosidad": "Su función benéfica de acogida a estudiantes y clérigos se mantuvo durante siglos."
      },
      {
        "num": 8,
        "nombre": "Arco de Santa Ana y Condes de Adanero",
        "tiempo_parada": "9 min",
        "claves": "La fachada de los Condes de Adanero sigue modelos manieristas italianos de Sebastiano Serlio.",
        "audio_texto": "Ascendiendo por el Adarve del Padre Rosalío pasamos el Arco de Santa Ana y el Palacio de los Condes de Adanero, cuya fachada de sillares almohadillados sigue los tratados de Sebastiano Serlio.",
        "curiosidad": "Es uno de los tramos más tranquilos y cinematográficos del camino de ronda."
      },
      {
        "num": 9,
        "nombre": "Plaza de Caldereros · La Generala",
        "tiempo_parada": "9 min",
        "claves": "Casa fuerte transformada en palacio en siglos posteriores, cerrando el anillo defensivo junto al Arco de la Estrella.",
        "audio_texto": "Completamos la vuelta íntegra al adarve en la Plaza de Caldereros, frente al Palacio de la Generala, desde donde se accede al Foro de los Balbos.",
        "curiosidad": "El adarve cacereño conserva nombres evocadores en cada tramo: Estrella, Obispo Álvarez de Castro, Cristo, Padre Rosalío."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "📜",
        "nombre": "Archivo Histórico Provincial",
        "desc": "Ubicado en el Palacio de Moctezuma (consultar horario de visitas al patio y exposiciones)."
      },
      {
        "icono": "ℹ️",
        "nombre": "Oficina de Turismo",
        "desc": "A la salida del Arco de la Estrella, en la Plaza Mayor."
      },
      {
        "icono": "📸",
        "nombre": "Miradores perimetrales",
        "desc": "Vistas privilegiadas sobre la ciudad nueva y la Ribera del Marco a lo largo del anillo."
      }
    ],
    "recomendaciones": [
      "Recorrido ideal al atardecer o en paseo nocturno, cuando la iluminación realza la piedra del adarve.",
      "Llevar calzado cómodo para el pavimento de piedra y los tramos en pendiente."
    ],
    "sostenibilidad": [
      "Circuito circular 100% peatonal que distribuye el flujo de visitantes por todo el perímetro monumental.",
      "Cuidado de las zonas residenciales históricas del interior de la muralla."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-11",
    "slug": "ciudad-extramuros-caceres",
    "file": "routes/ruta-11-ciudad-extramuros.html",
    "pdf": "routes/RUTAS/Ruta_Caceres_extramuros.pdf",
    "nombre": "11. Ruta por la ciudad extramuros",
    "eslogan": "De los arrabales del siglo XVI a la Real Audiencia de 1790, el Gran Teatro y el ensanche modernista de Cánovas",
    "tematica": "Esencia, Paisaje, Patrimonio y Arquitectura Moderna",
    "descripcion": "En el siglo XVI existía una clara diferenciación entre intramuros (nobles y clero) y el arrabal exterior. A partir de 1790, con la creación de la Real Audiencia de Extremadura, Cáceres inicia una gran expansión demográfica y urbanística que culmina en los siglos XIX y XX con el Ayuntamiento, el Gran Teatro y el Paseo de Cánovas.",
    "publico": "Público general, aficionados a la arquitectura neoclásica, modernista y al urbanismo histórico.",
    "duracion": "2 horas y 30 minutos",
    "distancia": "3,1 km",
    "dificultad": "Baja (Urbana)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Accesible (PMR) - Calles urbanas peatonales y aceras amplias en todo el itinerario.",
    "inicio_final": "Inicio en Ayuntamiento de Cáceres (Plaza Mayor) / Final en Chalé de los Málaga (Paseo de Cánovas)",
    "numero_paradas": 14,
    "bg_gradient": "linear-gradient(135deg, #15803d 0%, #14532d 100%)",
    "mapa": {
      "viewBox": "0 0 1280 400",
      "svgPath": "M 95,208 C 137,208 137,265 179,265 C 221,265 221,254 263,254 C 305,254 305,189 347,189 C 388,189 388,146 430,146 C 472,146 472,176 514,176 C 556,176 556,244 598,244 C 640,244 640,269 682,269 C 724,269 724,222 766,222 C 808,222 808,158 850,158 C 892,158 892,154 933,154 C 975,154 975,213 1017,213 C 1059,213 1059,267 1101,267 C 1143,267 1143,251 1185,251",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 208,
          "name": "Ayuntamiento de Cáceres",
          "label_y": 174
        },
        {
          "num": 2,
          "x": 179,
          "y": 265,
          "name": "Arco de España",
          "label_y": 309
        },
        {
          "num": 3,
          "x": 263,
          "y": 254,
          "name": "Palacio de Francisco d…",
          "label_y": 220
        },
        {
          "num": 4,
          "x": 347,
          "y": 189,
          "name": "Enfermería San Pedro A…",
          "label_y": 233
        },
        {
          "num": 5,
          "x": 430,
          "y": 146,
          "name": "Audiencia Provincial ·…",
          "label_y": 112
        },
        {
          "num": 6,
          "x": 514,
          "y": 176,
          "name": "Palacio Duques de Abra…",
          "label_y": 220
        },
        {
          "num": 7,
          "x": 598,
          "y": 244,
          "name": "Iglesia de Santo Domingo",
          "label_y": 210
        },
        {
          "num": 8,
          "x": 682,
          "y": 269,
          "name": "Palacio de Galarza",
          "label_y": 313
        },
        {
          "num": 9,
          "x": 766,
          "y": 222,
          "name": "Casa Marqués de Camarena",
          "label_y": 188
        },
        {
          "num": 10,
          "x": 850,
          "y": 158,
          "name": "Palacio de la Isla",
          "label_y": 202
        },
        {
          "num": 11,
          "x": 933,
          "y": 154,
          "name": "Calle Pintores y Plaza…",
          "label_y": 120
        },
        {
          "num": 12,
          "x": 1017,
          "y": 213,
          "name": "Gran Teatro",
          "label_y": 257
        },
        {
          "num": 13,
          "x": 1101,
          "y": 267,
          "name": "Arquitectura del Paseo…",
          "label_y": 233
        },
        {
          "num": 14,
          "x": 1185,
          "y": 251,
          "name": "Chalé de los Málaga",
          "label_y": 295
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Ayuntamiento de Cáceres",
        "tiempo": "00:00 - 00:10",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Edificio de 1869 proyectado por Ignacio M.ª de Michelena sobre la antigua cárcel de la villa."
      },
      {
        "parada": 2,
        "titulo": "Arco de España y Rondas de la Villa",
        "tiempo": "00:12 - 00:20",
        "distancia_tramo": "0,2 km",
        "descripcion": "Entorno junto a la Torre de Bujaco donde en 1303 se autorizaron las primeras viviendas extramuros (Rondas de la Villa)."
      },
      {
        "parada": 3,
        "titulo": "Palacio de Francisco de Godoy",
        "tiempo": "00:24 - 00:34",
        "distancia_tramo": "0,25 km",
        "descripcion": "Palacio renacentista con magnífico balcón de esquina realizado por Pedro de Marquina en 1563."
      },
      {
        "parada": 4,
        "titulo": "Capilla de la Enfermería de San Pedro de Alcántara",
        "tiempo": "00:38 - 00:46",
        "distancia_tramo": "0,2 km",
        "descripcion": "Templo finalizado en 1765 célebre por la exuberante decoración barroca de yeserías en su bóveda."
      },
      {
        "parada": 5,
        "titulo": "Audiencia Provincial de Cáceres (Hospital de la Piedad)",
        "tiempo": "00:50 - 01:02",
        "distancia_tramo": "0,2 km",
        "descripcion": "Sede de la Real Audiencia de Extremadura creada en 1790 sobre el antiguo Hospital de la Piedad del siglo XVII."
      },
      {
        "parada": 6,
        "titulo": "Palacio de los Duques de Abrantes",
        "tiempo": "01:06 - 01:14",
        "distancia_tramo": "0,25 km",
        "descripcion": "Austero palacio del siglo XVI con elementos góticos y torre con gran matacán en la Plaza del Duque."
      },
      {
        "parada": 7,
        "titulo": "Iglesia de Santo Domingo",
        "tiempo": "01:18 - 01:28",
        "distancia_tramo": "0,25 km",
        "descripcion": "Iglesia franciscana del siglo XVI con portada de medio punto, planta de cruz latina y retablo mayor del XVII."
      },
      {
        "parada": 8,
        "titulo": "Palacio de Galarza (Torre de los Trucos)",
        "tiempo": "01:32 - 01:38",
        "distancia_tramo": "0,2 km",
        "descripcion": "Antiguo solar de los Mesía de Ovando, famoso por su ventana de esquina plateresca."
      },
      {
        "parada": 9,
        "titulo": "Casa Marqués de Camarena",
        "tiempo": "01:40 - 01:46",
        "distancia_tramo": "0,1 km",
        "descripcion": "Construida por los Carvajal en el siglo XV y reformada hasta el XVIII; hoy sede del Colegio Oficial de Arquitectos."
      },
      {
        "parada": 10,
        "titulo": "Palacio de la Isla",
        "tiempo": "01:48 - 01:56",
        "distancia_tramo": "0,15 km",
        "descripcion": "Levantado sobre el solar de la sinagoga de la Judería Nueva (1478) en las proximidades de la Plaza Mayor."
      },
      {
        "parada": 11,
        "titulo": "Calle Pintores y Plaza de San Juan",
        "tiempo": "02:00 - 02:10",
        "distancia_tramo": "0,35 km",
        "descripcion": "Eje comercial histórico donde se instalaron gremios de pintores, zapateros y sastres junto a la Plaza Mayor."
      },
      {
        "parada": 12,
        "titulo": "Gran Teatro de Cáceres",
        "tiempo": "02:14 - 02:22",
        "distancia_tramo": "0,3 km",
        "descripcion": "Inaugurado en 1927, emblema de la vida cultural y escénica de la Cáceres contemporánea."
      },
      {
        "parada": 13,
        "titulo": "Arquitectura singular en el Paseo de Cánovas",
        "tiempo": "02:26 - 02:34",
        "distancia_tramo": "0,35 km",
        "descripcion": "Conjunto de palacetes modernistas y neoplaterescos levantados entre 1900 y 1930 en el ensanche burgués."
      },
      {
        "parada": 14,
        "titulo": "Chalé de los Málaga",
        "tiempo": "02:38 - 02:48",
        "distancia_tramo": "0,3 km (Final)",
        "descripcion": "Inmueble ajardinado proyectado por el arquitecto López Murena inspirado en la arquitectura contemporánea de Guipúzcoa."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Ayuntamiento de Cáceres",
        "tiempo_parada": "10 min",
        "claves": "Símbolo de la consolidación de la Plaza Mayor como epicentro económico y social en el siglo XIX.",
        "audio_texto": "Partimos del Ayuntamiento de Cáceres, levantado en 1869 por Ignacio María de Michelena, punto de arranque de la ciudad que creció fuera de las murallas.",
        "curiosidad": "Antes de 1869, el Concejo se reunía en el cercano Foro de los Balbos."
      },
      {
        "num": 2,
        "nombre": "Arco de España",
        "tiempo_parada": "8 min",
        "claves": "Testimonio del nacimiento de los primeros arrabales adosados a la muralla norte.",
        "audio_texto": "Junto al Arco de España y la Torre de Bujaco surgieron en 1303 las llamadas Rondas de la Villa, las primeras viviendas autorizadas fuera del recinto amurallado.",
        "curiosidad": "Estas casas marcaron el origen urbano de la actual Plaza Mayor."
      },
      {
        "num": 3,
        "nombre": "Palacio de Francisco de Godoy",
        "tiempo_parada": "10 min",
        "claves": "Balcón con columnas de orden compuesto, frontón con busto decorativo y escudo de Godoy y Aldana coronado por yelmo. Promovido por Francisco de Godoy, Gobernador en América.",
        "audio_texto": "El Palacio de Francisco de Godoy luce uno de los balcones de esquina más bellos de España, labrado por Pedro de Marquina en 1563 con los escudos de Godoy y Aldana.",
        "curiosidad": "Francisco de Godoy llegó a ser Gobernador de los Reyes en América y a su regreso se casó con Leonor de Ulloa."
      },
      {
        "num": 4,
        "nombre": "Enfermería San Pedro Alcántara",
        "tiempo_parada": "8 min",
        "claves": "Su recargado barroquismo en yeserías resulta único dentro del panorama arquitectónico de Cáceres.",
        "audio_texto": "Terminada en 1765, la Capilla de la Enfermería de San Pedro de Alcántara sorprende por las yeserías barrocas de su bóveda, únicas en la ciudad.",
        "curiosidad": "Servía de enfermería y lugar de descanso a los frailes franciscanos que acudían a la villa."
      },
      {
        "num": 5,
        "nombre": "Audiencia Provincial · H. Piedad",
        "tiempo_parada": "12 min",
        "claves": "Conserva el patio central y escalera del XVII; fachada neoclásica obra de Manuel Martín Rodríguez, discípulo de Ventura Rodríguez.",
        "audio_texto": "La creación en 1790 de la Real Audiencia de Extremadura transformó Cáceres. Para acogerla se reformó el Hospital de la Piedad con una elegante fachada neoclásica de Manuel Martín Rodríguez.",
        "curiosidad": "La instalación de la Audiencia impulsó la modernización demográfica, jurídica y urbanística de Cáceres."
      },
      {
        "num": 6,
        "nombre": "Palacio Duques de Abrantes",
        "tiempo_parada": "8 min",
        "claves": "Actualmente rehabilitado como residencia de estudiantes.",
        "audio_texto": "Regresando hacia la Plaza del Duque encontramos el Palacio de los Duques de Abrantes, del siglo XVI, inconfundible por el gran matacán de su torre.",
        "curiosidad": "Mantiene el aspecto recio de casa fuerte nobiliaria en pleno arrabal norte."
      },
      {
        "num": 7,
        "nombre": "Iglesia de Santo Domingo",
        "tiempo_parada": "10 min",
        "claves": "Hornacina exterior con la Inmaculada y talla policromada de Santo Domingo de mediados del siglo XVIII.",
        "audio_texto": "La Iglesia de Santo Domingo, de la Orden Franciscana, combina su austera fábrica del siglo XVI con un rico retablo mayor del siglo XVII.",
        "curiosidad": "Cuenta con capillas entre contrafuertes y presbiterio ochavado."
      },
      {
        "num": 8,
        "nombre": "Palacio de Galarza",
        "tiempo_parada": "6 min",
        "claves": "Popularmente conocida como la Torre de los Trucos.",
        "audio_texto": "Bajando hacia el centro comercial histórico nos detiene el Palacio de Galarza y su célebre Torre de los Trucos.",
        "curiosidad": "Enlaza directamente con la calle General Ezponda y la Plaza de la Concepción."
      },
      {
        "num": 9,
        "nombre": "Casa Marqués de Camarena",
        "tiempo_parada": "6 min",
        "claves": "Ejemplo de reutilización cultural contemporánea de un palacio extramuros.",
        "audio_texto": "A pocos metros, la Casa del Marqués de Camarena conserva la huella de los Carvajal y hoy es sede del Colegio Oficial de Arquitectos.",
        "curiosidad": "Alberga frecuentes exposiciones sobre patrimonio y arquitectura."
      },
      {
        "num": 10,
        "nombre": "Palacio de la Isla",
        "tiempo_parada": "8 min",
        "claves": "Horario: Lunes a viernes 10:00-14:00 y 17:30-20:30; sábados 10:00-14:00.",
        "audio_texto": "El Palacio de la Isla recuerda la ubicación de la Judería Nueva de 1478 y ofrece hoy un elegante espacio cultural abierto al público.",
        "curiosidad": "Combina detalles manieristas en su portada con reminiscencias góticas en el patio."
      },
      {
        "num": 11,
        "nombre": "Calle Pintores y Plaza San Juan",
        "tiempo_parada": "10 min",
        "claves": "Conecta el centro medieval con la expansión urbana de los siglos XIX y XX.",
        "audio_texto": "La animada Calle Pintores y la Plaza de San Juan perpetúan el espíritu comercial y gremial que rodeó la Plaza Mayor desde su aparición.",
        "curiosidad": "Es hoy la principal arteria peatonal y comercial del centro de Cáceres."
      },
      {
        "num": 12,
        "nombre": "Gran Teatro",
        "tiempo_parada": "8 min",
        "claves": "Referente arquitectónico del primer tercio del siglo XX junto a la calle San Antón.",
        "audio_texto": "Construido en 1927, el Gran Teatro refleja el dinamismo cultural de la burguesía cacereña de principios del siglo XX.",
        "curiosidad": "Sigue siendo el principal escenario de teatro, música y festivales de la ciudad."
      },
      {
        "num": 13,
        "nombre": "Arquitectura del Paseo de Cánovas",
        "tiempo_parada": "8 min",
        "claves": "Muestra el salto estético de Cáceres hacia el eclecticismo, el modernismo y el regionalismo.",
        "audio_texto": "El Paseo de Cánovas fue el ensanche elegido desde 1900 para edificar palacetes modernistas y neoplaterescos en torno a un gran bulevar arbolado.",
        "curiosidad": "Sus jardines albergan más de un centenar de especies botánicas."
      },
      {
        "num": 14,
        "nombre": "Chalé de los Málaga",
        "tiempo_parada": "10 min",
        "claves": "Obra representativa del momento histórico del ensanche cacereño.",
        "audio_texto": "Concluimos ante el Chalé de los Málaga, residencia ajardinada planificada por López Murena con inspiración vasca que corona la arquitectura del ensanche.",
        "curiosidad": "Su silueta pintoresca contrasta con la piedra medieval del punto de partida, resumiendo seis siglos de evolución urbana."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🏛️",
        "nombre": "Espacios culturales",
        "desc": "Palacio de la Isla, Gran Teatro y Colegio de Arquitectos a lo largo del eje."
      },
      {
        "icono": "🚌",
        "nombre": "Conexión urbana",
        "desc": "Paradas de autobús y aparcamientos subterráneos en Obispo Galarza y Paseo de Cánovas."
      },
      {
        "icono": "🛍️",
        "nombre": "Comercio y hostelería",
        "desc": "Eje comercial de Calle Pintores, San Juan y Avenida de España (Cánovas)."
      }
    ],
    "recomendaciones": [
      "Ruta muy cómoda y llana, perfecta para realizar en familia o con silla de ruedas.",
      "Prestar atención a las fachadas de principios del siglo XX a lo largo de la Avenida de España."
    ],
    "sostenibilidad": [
      "Recorrido peatonal que conecta el casco histórico con el ensanche verde de Cánovas.",
      "Puesta en valor del patrimonio arquitectónico moderno y contemporáneo de Cáceres."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-12",
    "slug": "mineria-aldea-moret",
    "file": "routes/ruta-12-mineria-aldea-moret.html",
    "pdf": "routes/RUTAS/Ruta_La_mineria_en_Aldea_Moret.pdf",
    "nombre": "12. La minería en Cáceres (Aldea Moret)",
    "eslogan": "Un siglo de fosfatos de cal, ciudad jardín obrera, ferrocarril y patrimonio industrial en el Calerizo",
    "tematica": "Paisaje, Patrimonio, Arqueología Industrial e Historia Contemporánea",
    "descripcion": "Desde el descubrimiento de los fosfatos de cal en 1864 por Francisco Lorenzo Acuña «el Fraile» hasta el cierre de las minas en los años sesenta, Aldea Moret introdujo a Cáceres en la Revolución Industrial, el ferrocarril (1881) y el urbanismo moderno. Esta ruta recorre su poblado obrero —declarado Bien de Interés Cultural—, pozos mineros y el Centro de Interpretación de la Minería.",
    "publico": "Público general, aficionados al patrimonio industrial, historia contemporánea, familias y centros educativos.",
    "duracion": "2 horas y 45 minutos",
    "distancia": "4,8 km",
    "dificultad": "Media (Urbana y caminos mineros periurbanos)",
    "dificultad_class": "diff-media",
    "accesibilidad": "Parcialmente accesible - Tramo urbano del poblado de Aldea Moret accesible; pistas de tierra hacia las minas de San Salvador y Esmeralda.",
    "inicio_final": "Inicio en Edificio Embarcadero / Final en Mina de la Abundancia (Centro de Interpretación)",
    "numero_paradas": 9,
    "bg_gradient": "linear-gradient(135deg, #9f1239 0%, #334155 100%)",
    "mapa": {
      "viewBox": "0 0 1040 380",
      "svgPath": "M 95,198 C 148,198 148,254 201,254 C 254,254 254,244 308,244 C 361,244 361,179 414,179 C 467,179 467,136 520,136 C 573,136 573,166 626,166 C 679,166 679,233 732,233 C 786,233 786,258 839,258 C 892,258 892,211 945,211",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 198,
          "name": "Edificio Embarcadero",
          "label_y": 164
        },
        {
          "num": 2,
          "x": 201,
          "y": 254,
          "name": "Garaje 2.0",
          "label_y": 298
        },
        {
          "num": 3,
          "x": 308,
          "y": 244,
          "name": "Poblado Minero de Alde…",
          "label_y": 210
        },
        {
          "num": 4,
          "x": 414,
          "y": 179,
          "name": "Iglesia de San Eugenio",
          "label_y": 223
        },
        {
          "num": 5,
          "x": 520,
          "y": 136,
          "name": "El Malacate",
          "label_y": 102
        },
        {
          "num": 6,
          "x": 626,
          "y": 166,
          "name": "Restos del Entramado d…",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 732,
          "y": 233,
          "name": "Mina de San Salvador",
          "label_y": 199
        },
        {
          "num": 8,
          "x": 839,
          "y": 258,
          "name": "Mina de la Esmeralda",
          "label_y": 302
        },
        {
          "num": 9,
          "x": 945,
          "y": 211,
          "name": "Mina de la Abundancia…",
          "label_y": 177
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Edificio Embarcadero",
        "tiempo": "00:00 - 00:15",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Antiguo apartadero ferroviario minero inaugurado en julio de 1958, rehabilitado hoy como espacio cultural del «Polo de la Innovación»."
      },
      {
        "parada": 2,
        "titulo": "Garaje 2.0",
        "tiempo": "00:18 - 00:28",
        "distancia_tramo": "0,2 km",
        "descripcion": "Nave industrial minera rehabilitada junto al Embarcadero dentro del proyecto de regeneración del Polo de la Innovación."
      },
      {
        "parada": 3,
        "titulo": "El Poblado minero de Aldea Moret. Patrimonio Industrial (BIC)",
        "tiempo": "00:32 - 00:52",
        "distancia_tramo": "0,4 km",
        "descripcion": "Uno de los primeros ejemplos de planeamiento urbanístico en España como ciudad jardín obrera (ca. 1880), con trama ortogonal en damero al estilo de Ildefons Cerdà."
      },
      {
        "parada": 4,
        "titulo": "Iglesia de San Eugenio",
        "tiempo": "00:55 - 01:07",
        "distancia_tramo": "0,3 km",
        "descripcion": "Templo encargado en 1883 al arquitecto de las minas, Ruperto Ramírez."
      },
      {
        "parada": 5,
        "titulo": "El Malacate",
        "tiempo": "01:12 - 01:22",
        "distancia_tramo": "0,3 km",
        "descripcion": "Vestigio del ingenio mecánico de tracción animal usado para extraer mineral, agua o escombros de los pozos."
      },
      {
        "parada": 6,
        "titulo": "Restos del entramado de Galerías",
        "tiempo": "01:25 - 01:35",
        "distancia_tramo": "0,3 km",
        "descripcion": "Huellas en superficie de la red subterránea que perforó el Calerizo cacereño durante casi un siglo."
      },
      {
        "parada": 7,
        "titulo": "Mina de San Salvador (El Torreón)",
        "tiempo": "01:45 - 02:00",
        "distancia_tramo": "1,1 km",
        "descripcion": "Conocida como «el Torreón», fechada en 1881, una de las pocas minas que conserva viviendas obreras adosadas al pozo."
      },
      {
        "parada": 8,
        "titulo": "Mina de la Esmeralda",
        "tiempo": "02:10 - 02:25",
        "distancia_tramo": "1,0 km",
        "descripcion": "Una de las explotaciones mejor conservadas, poseedora de la única chimenea que queda en pie de los viejos hornos."
      },
      {
        "parada": 9,
        "titulo": "Mina de la Abundancia. Centro de Interpretación de la Minería en Extremadura",
        "tiempo": "02:35 - 02:55",
        "distancia_tramo": "1,2 km (Final)",
        "descripcion": "Origen del hallazgo de 1864 convertido en museo de tres plantas sobre la minería de fosfatos y la historia minera extremeña."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Edificio Embarcadero",
        "tiempo_parada": "15 min",
        "claves": "Las instalaciones mineras exigían el ferrocarril para transportar el fosfato con rapidez hacia los mercados.",
        "audio_texto": "Comenzamos en el Edificio Embarcadero, fruto del enlace ferroviario construido para dar salida al mineral en 1958 y hoy recuperado como contenedor cultural y creativo.",
        "curiosidad": "Las obras de la vía de apartadero duraron un año y medio y finalizaron en julio de 1958."
      },
      {
        "num": 2,
        "nombre": "Garaje 2.0",
        "tiempo_parada": "10 min",
        "claves": "Ejemplo de reconversión de arquitectura industrial del siglo XX en equipamiento contemporáneo para el barrio.",
        "audio_texto": "Junto al Embarcadero, el espacio Garaje 2.0 muestra cómo la memoria industrial de Aldea Moret se reinventa para usos culturales y juveniles.",
        "curiosidad": "Forma parte del corredor ferroviario que conectó Aldea Moret con la línea Lisboa-Cáceres-Madrid."
      },
      {
        "num": 3,
        "nombre": "Poblado Minero de Aldea Moret",
        "tiempo_parada": "20 min",
        "claves": "Surgido tras el hallazgo de fosfatos en 1864 y nombrado en honor al político liberal Segismundo Moret. Era autosuficiente: escuelas, iglesia, cantina, cine, bailes, piscina y campo de fútbol. Llegada del tren en 1881 (Alfonso XII); cierre en 1962 por la competencia del norte de África.",
        "audio_texto": "El poblado de Aldea Moret, Bien de Interés Cultural, aplicó hacia 1880 el esquema en damero con jardines interiores de Cerdà. Disponía de escuelas, cantina, cine, piscina y campo de fútbol para las familias mineras.",
        "curiosidad": "Las minas no cerraron en 1962 por agotamiento del mineral, sino por la competencia de los fosfatos más baratos del norte de África."
      },
      {
        "num": 4,
        "nombre": "Iglesia de San Eugenio",
        "tiempo_parada": "12 min",
        "claves": "Conserva piezas trasladadas en 1918 desde la arruinada ermita de San Benito: imagen de San Benito (s. XVIII), campana, retablo del XVIII y un relicario argentino.",
        "audio_texto": "La Iglesia de San Eugenio fue diseñada en 1883 por el propio arquitecto de las minas, Ruperto Ramírez, y custodia valiosas piezas procedentes de la antigua ermita de San Benito.",
        "curiosidad": "Entre sus tesoros figura un singular relicario argentino traído en 1918."
      },
      {
        "num": 5,
        "nombre": "El Malacate",
        "tiempo_parada": "10 min",
        "claves": "A modo de cabrestante invertido movido por caballerías; desde 1876, al adquirir Segismundo Moret las minas e introducir máquinas de vapor, pasaron a servir de almacenes.",
        "audio_texto": "Junto al parque de Aldea Moret contemplamos un malacate, mecanismo movido por caballerías para elevar el mineral antes de la llegada de las máquinas de vapor en 1876.",
        "curiosidad": "Es uno de los testimonios materiales más antiguos de la mecanización minera en Extremadura."
      },
      {
        "num": 6,
        "nombre": "Restos del Entramado de Galerías",
        "tiempo_parada": "10 min",
        "claves": "Permite comprender la magnitud de la explotación de fosfatos que transformó el paisaje de la Sierra de San Pedro y Aldea Moret.",
        "audio_texto": "En este sector afloran restos del entramado de galerías y estructuras que conectaban los pozos de extracción con las zonas de lavado y carga.",
        "curiosidad": "Aunque la última mina cerró hacia 1959-1962, la última instalación del complejo industrial se mantuvo hasta 1974."
      },
      {
        "num": 7,
        "nombre": "Mina de San Salvador",
        "tiempo_parada": "15 min",
        "claves": "Combina ladrillo y mampostería bajo influencia del estilo victoriano inglés empleado en minas del Reino Unido.",
        "audio_texto": "La Mina de San Salvador, de 1881 y conocida como el Torreón, sorprende por su arquitectura de inspiración victoriana inglesa y por conservar las casas de los mineros adosadas al pozo.",
        "curiosidad": "La presencia de ingenieros y capital británico dejó una huella estética inconfundible en el Calerizo."
      },
      {
        "num": 8,
        "nombre": "Mina de la Esmeralda",
        "tiempo_parada": "15 min",
        "claves": "Conserva las torres de acero de la Compañía de Aguas de Cáceres (creada en 1899), que aún hoy abastece de agua a varias urbanizaciones de la ciudad.",
        "audio_texto": "En la Mina de la Esmeralda se alza la única chimenea conservada de los antiguos hornos mineros, junto a las torres de acero de la histórica Compañía de Aguas de Cáceres de 1899.",
        "curiosidad": "Los acuíferos del Calerizo vinculados a esta mina siguen abasteciendo a urbanizaciones cacereñas más de un siglo después."
      },
      {
        "num": 9,
        "nombre": "Mina de la Abundancia · C. Interpretación",
        "tiempo_parada": "20 min",
        "claves": "Planta baja: historia desde 1864 hasta los años 60. Planta 1: triturado y escogido a mano. Planta 2: silo del mineral e historia de la minería. Horario: L-D 10:00-14:00 y 17:00-20:00 (verano) / 16:00-19:00 (invierno).",
        "audio_texto": "Culminamos la ruta en la Mina de la Abundancia, sede del Centro de Interpretación de la Minería en Extremadura, donde sus tres plantas explican desde el triturado manual hasta la transformación social de Cáceres.",
        "curiosidad": "Fue precisamente en las inmediaciones de la Abundancia donde en 1864 «el Fraile» identificó la piedra caliza rica en fosfato."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "⛏️",
        "nombre": "Centro de Interpretación de la Minería",
        "desc": "Mina de la Abundancia · Lunes a domingo: 10:00-14:00 y 17:00-20:00 (verano) / 16:00-19:00 (invierno)."
      },
      {
        "icono": "🎭",
        "nombre": "Edificio Embarcadero y Garaje 2.0",
        "desc": "Espacios culturales y expositivos en el acceso ferroviario de Aldea Moret."
      },
      {
        "icono": "🚌",
        "nombre": "Transporte público",
        "desc": "Conexión directa mediante autobús urbano desde el centro de Cáceres a Aldea Moret."
      }
    ],
    "recomendaciones": [
      "Llevar calzado de senderismo ligero o deportivo para el tramo de pistas hacia San Salvador y la Esmeralda.",
      "Llevar agua y protección solar, especialmente en los sectores abiertos del Calerizo.",
      "No acceder a zonas valladas ni antiguos pozos fuera del recorrido señalizado."
    ],
    "sostenibilidad": [
      "Recuperación y puesta en valor del patrimonio industrial y la memoria obrera de Aldea Moret.",
      "Acceso recomendado en transporte público urbano hasta el inicio de la ruta."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  },
  {
    "id": "ruta-13",
    "slug": "parques-de-caceres",
    "file": "routes/ruta-13-parques-caceres.html",
    "pdf": "routes/RUTAS/Ruta_parques_de_Caceres.pdf",
    "nombre": "13. Parques de Cáceres",
    "eslogan": "Un recorrido botánico y panorámico por los seis grandes pulmones verdes de la ciudad",
    "tematica": "Ecoturismo, Paisaje, Botánica y Ocio Urbano",
    "descripcion": "Itinerario verde que une los seis grandes parques y espacios naturales urbanos de Cáceres: el bosque mediterráneo del Olivar de los Frailes, el jardín botánico y museo al aire libre del Parque del Príncipe, las 113 especies del Paseo de Cánovas, el cinturón hortícola de la Ribera del Marco, las vistas del Paseo Alto y el lago del Parque del Rodeo.",
    "publico": "Familias con niños, corredores, amantes de la botánica, la fotografía de paisaje y el ocio saludable.",
    "duracion": "3 horas (o realizable por tramos)",
    "distancia": "7,2 km",
    "dificultad": "Baja (Paseos urbanos ajardinados)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Accesible (PMR) - Paseos pavimentados y senderos amplios en Cánovas, Príncipe y Rodeo; pendiente moderada en acceso al Paseo Alto.",
    "inicio_final": "Inicio en Olivar de los Frailes / Final en Parque del Rodeo",
    "numero_paradas": 6,
    "bg_gradient": "linear-gradient(135deg, #16a34a 0%, #065f46 100%)",
    "mapa": {
      "viewBox": "0 0 840 360",
      "svgPath": "M 95,187 C 160,187 160,244 225,244 C 290,244 290,233 355,233 C 420,233 420,168 485,168 C 550,168 550,126 615,126 C 680,126 680,156 745,156",
      "puntos": [
        {
          "num": 1,
          "x": 95,
          "y": 187,
          "name": "Olivar de los Frailes",
          "label_y": 153
        },
        {
          "num": 2,
          "x": 225,
          "y": 244,
          "name": "Parque del Príncipe",
          "label_y": 288
        },
        {
          "num": 3,
          "x": 355,
          "y": 233,
          "name": "Paseo de Cánovas",
          "label_y": 199
        },
        {
          "num": 4,
          "x": 485,
          "y": 168,
          "name": "La Ribera del Marco",
          "label_y": 212
        },
        {
          "num": 5,
          "x": 615,
          "y": 126,
          "name": "Paseo Alto",
          "label_y": 92
        },
        {
          "num": 6,
          "x": 745,
          "y": 156,
          "name": "Parque del Rodeo",
          "label_y": 200
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Olivar de los Frailes (12,5 ha)",
        "tiempo": "00:00 - 00:30",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Espacio natural de 12,5 hectáreas que conserva la vegetación original de bosque mediterráneo."
      },
      {
        "parada": 2,
        "titulo": "Parque del Príncipe (21,3 ha)",
        "tiempo": "00:40 - 01:10",
        "distancia_tramo": "1,6 km",
        "descripcion": "Gran parque de 21,3 hectáreas articulado por un paseo central de agua canalizada, estanques, fuentes y Museo de Escultura al Aire Libre."
      },
      {
        "parada": 3,
        "titulo": "Paseo de Cánovas (113 especies botánicas)",
        "tiempo": "01:20 - 01:45",
        "distancia_tramo": "1,3 km",
        "descripcion": "El gran ensanche proyectado por la burguesía cacereña a finales del XIX, rodeado de palacetes modernistas y neoplaterescos (1920-1930)."
      },
      {
        "parada": 4,
        "titulo": "La Ribera del Marco (Cinturón verde)",
        "tiempo": "01:55 - 02:20",
        "distancia_tramo": "1,6 km",
        "descripcion": "Franja fértil de 7 km que rodea la Ciudad Monumental hasta el Guadiloba, recuperada con un recorrido ecoturístico de 1,5 km."
      },
      {
        "parada": 5,
        "titulo": "Paseo Alto (Cerro del Teso)",
        "tiempo": "02:30 - 02:50",
        "distancia_tramo": "1,5 km",
        "descripcion": "Mirador arbolado sobre el Cerro del Teso con panorámicas de Cáceres, acceso por el Paseo de Ibarrola (ca. 1920) desde la Plaza de Toros."
      },
      {
        "parada": 6,
        "titulo": "Parque del Rodeo (10,6 ha)",
        "tiempo": "02:55 - 03:15",
        "distancia_tramo": "1,2 km (Final)",
        "descripcion": "Extensas praderas de 10,6 hectáreas con almeces, alisos y fresnos, gran lago artificial y vistas a San Francisco y San Jorge."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Olivar de los Frailes",
        "tiempo_parada": "30 min",
        "claves": "Encinas, alcornoques, olivos y piruétanos. Alberga una Casa de Labranza convertida en Centro de Educación Ambiental, charca, parque infantil, merendero y barbacoas.",
        "audio_texto": "Comenzamos en el Olivar de los Frailes, doce hectáreas y media de bosque mediterráneo original con encinas, alcornoques y piruétanos, equipado con Centro de Educación Ambiental y merendero.",
        "curiosidad": "Su charca y arboleda autóctona permiten observar fauna mediterránea sin salir del entorno urbano."
      },
      {
        "num": 2,
        "nombre": "Parque del Príncipe",
        "tiempo_parada": "30 min",
        "claves": "Repoblado con olmos y chopos en los años 70 y 80, cuenta además con Estufa Fría y jardín botánico.",
        "audio_texto": "El Parque del Príncipe, con más de veintiuna hectáreas, combina agua canalizada, estanques, jardín botánico, estufa fría y un singular Museo de Escultura al Aire Libre.",
        "curiosidad": "Su colección de esculturas contemporáneas al aire libre integra arte y botánica a lo largo de sus paseos."
      },
      {
        "num": 3,
        "nombre": "Paseo de Cánovas",
        "tiempo_parada": "25 min",
        "claves": "Alberga una extraordinaria riqueza botánica con 113 especies arbóreas y arbustivas: ginkgos, tejos, acebos, dragos, cicas, bojes y tilos conviviendo con flora autóctona.",
        "audio_texto": "El Paseo de Cánovas es el bulevar histórico del ensanche burgués y un auténtico arboreto urbano con ciento trece especies, entre ellas ginkgos, tejos, acebos, dragos y tilos.",
        "curiosidad": "Es el corazón social de la ciudad moderna, combinando patrimonio arquitectónico de 1900-1930 y biodiversidad."
      },
      {
        "num": 4,
        "nombre": "La Ribera del Marco",
        "tiempo_parada": "25 min",
        "claves": "Durante siglos sustentó huertas, frutales, fuentes, lavaderos, molinos, batanes, tenerías y fábricas de curtidos y ceras.",
        "audio_texto": "La Ribera del Marco dibuja el cinturón verde histórico junto a la Ciudad Monumental, combinando huertas centenarias con un recorrido ecoturístico recuperado de kilómetro y medio.",
        "curiosidad": "Sus aguas alimentaron molinos, batanes y tenerías hasta mediados del siglo XX."
      },
      {
        "num": 5,
        "nombre": "Paseo Alto",
        "tiempo_parada": "20 min",
        "claves": "Encinas, madroños, pinos y eucaliptos. Corona la cima la Ermita de los Santos Mártires (1860); conserva un polvorín de la Guerra Civil y una fuente neomudéjar de 1927.",
        "audio_texto": "Desde el Paseo Alto, en el Cerro del Teso, disfrutamos de amplias panorámicas de Cáceres entre pinos, madroños y encinas, junto a la Ermita de los Santos Mártires y su fuente neomudéjar de 1927.",
        "curiosidad": "Aún conserva un antiguo polvorín de la Guerra Civil integrado en el parque."
      },
      {
        "num": 6,
        "nombre": "Parque del Rodeo",
        "tiempo_parada": "20 min",
        "claves": "La cascada que alimenta el lago está coronada por la escultura «Las Ninfas», obra de Juan de Ávalos.",
        "audio_texto": "Finalizamos en el Parque del Rodeo, más de diez hectáreas de praderas y sombra en torno a su lago artificial presidido por la escultura Las Ninfas de Juan de Ávalos.",
        "curiosidad": "Desde sus praderas se contempla una espléndida estampa monumental del Convento de San Francisco y la Iglesia de San Jorge."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🌳",
        "nombre": "Centro de Educación Ambiental",
        "desc": "En la Casa de Labranza del Olivar de los Frailes."
      },
      {
        "icono": "🎨",
        "nombre": "Museo al Aire Libre y Estufa Fría",
        "desc": "En el interior del Parque del Príncipe."
      },
      {
        "icono": "🪑",
        "nombre": "Zonas infantiles y merenderos",
        "desc": "Áreas de juegos, fuentes potables y descanso en todos los parques del itinerario."
      }
    ],
    "recomendaciones": [
      "Se puede realizar como gran travesía verde de medio día o disfrutar parque por parque según el tiempo disponible.",
      "Llevar calzado deportivo cómodo, agua y gorra en meses soleados.",
      "Excelente ruta para observar especies botánicas ornamentales y autóctonas en primavera y otoño."
    ],
    "sostenibilidad": [
      "Fomento de la infraestructura verde urbana, la biodiversidad y la movilidad activa.",
      "Cuidado de estanques, arbolado singular y uso de papeleras de reciclaje en cada parque."
    ],
    "autoria": "Francisco José Bermejo Tarifa - Diseño Gráfico - Olimpo II · Fuente: SIG de Cáceres / Excmo. Ayuntamiento de Cáceres"
  }
];
