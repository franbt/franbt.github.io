// Datos completos estructurados de las Rutas Turísticas
const ROUTES_DATA = [
  {
    "id": "ruta-1",
    "slug": "ruta-alminares-murallas",
    "file": "routes/ruta-1-alminares.html",
    "nombre": "Ruta de los Alminares y Murallas Medievales",
    "eslogan": "Un viaje por los vestigios, callejones y secretos del medievo andalusí",
    "tematica": "Patrimonio Histórico y Arquitectura Andalusí",
    "descripcion": "Un recorrido monumental a través del casco histórico amurallado, explorando antiguos alminares convertidos en torres campanario, lienzos de muralla defensiva del siglo XI y puertas monumentales. La ruta descubre la ingeniería hidráulica urbana, la distribución gremial medieval y la convivencia cultural a través de su arquitectura vernácula.",
    "publico": "Público general, familias, aficionados a la historia, centros educativos y turismo cultural sénior. Adaptable para personas con movilidad reducida en el 85% de su trazado urbano.",
    "duracion": "2 horas y 15 minutos (a ritmo pausado)",
    "distancia": "3,4 km",
    "dificultad": "Baja (Urbana)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Accesible (PMR) - Pavimento empedrado regularizado y rampas en accesos clave",
    "inicio_final": "Inicio en Puerta de la Villa / Final en Mirador del Alminar Mayor",
    "numero_paradas": 6,
    "bg_gradient": "linear-gradient(135deg, #0d9488 0%, #1e293b 100%)",
    "mapa": {
      "viewBox": "0 0 800 350",
      "svgPath": "M 80,260 Q 180,210 260,230 T 420,160 T 560,180 T 720,90",
      "puntos": [
        {
          "num": 1,
          "x": 90,
          "y": 250,
          "name": "Puerta de la Villa",
          "label_y": 290
        },
        {
          "num": 2,
          "x": 210,
          "y": 210,
          "name": "Lienzo de Muralla Norte",
          "label_y": 170
        },
        {
          "num": 3,
          "x": 340,
          "y": 220,
          "name": "Alminar de San Juan",
          "label_y": 265
        },
        {
          "num": 4,
          "x": 460,
          "y": 150,
          "name": "Placeta del Aljibe",
          "label_y": 110
        },
        {
          "num": 5,
          "x": 580,
          "y": 180,
          "name": "Torre del Homenaje",
          "label_y": 225
        },
        {
          "num": 6,
          "x": 710,
          "y": 90,
          "name": "Mirador del Alminar Mayor",
          "label_y": 50
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Puerta de la Villa y Foso Histórico",
        "tiempo": "00:00 - 00:20",
        "distancia_tramo": "0,0 km (Punto de Encuentro)",
        "descripcion": "Acceso principal a la medina medieval. Explicación de la poliorcética defensiva en recodo y el sistema de cobro de aduanas."
      },
      {
        "parada": 2,
        "titulo": "Lienzo de Muralla Norte y Torreón Cuadrangular",
        "tiempo": "00:25 - 00:45",
        "distancia_tramo": "0,6 km",
        "descripcion": "Paseo por el adarve restaurado. Vista al antiguo valle agrícola exterior y técnica de tapial calicastrado."
      },
      {
        "parada": 3,
        "titulo": "Alminar de San Juan y Entorno Morisquista",
        "tiempo": "00:50 - 01:15",
        "distancia_tramo": "0,8 km",
        "descripcion": "Torre de ladrillo del siglo X que preserva modillones de rollos y celosías hispanomusulmanas."
      },
      {
        "parada": 4,
        "titulo": "Placeta del Aljibe y Baños Medievales",
        "tiempo": "01:20 - 01:40",
        "distancia_tramo": "0,7 km",
        "descripcion": "Descenso a la bóveda del aljibe comunal subterráneo. Muestra de la distribución de aguas por qanats."
      },
      {
        "parada": 5,
        "titulo": "Torre del Homenaje y Patio de Armas",
        "tiempo": "01:45 - 02:00",
        "distancia_tramo": "0,6 km",
        "descripcion": "Cúspide de la alcazaba urbana. Exposición de maquetas táctiles y réplicas de cerrajería medieval."
      },
      {
        "parada": 6,
        "titulo": "Mirador del Alminar Mayor y Puesta de Sol",
        "tiempo": "02:05 - 02:15",
        "distancia_tramo": "0,7 km (Meta)",
        "descripcion": "Panorámica de 360 grados sobre el casco histórico, la vega y el macizo montañoso circundante."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Puerta de la Villa",
        "tiempo_parada": "20 min",
        "claves": "Ingeniería militar en codo para impedir la carga directa de caballería; arco de herradura con dovelas de piedra caliza.",
        "audio_texto": "Nos encontramos en la Puerta de la Villa, la entrada más emblemática a la antigua medina fortificada. Observen la disposición en ángulo recto diseñada estratégicamente para neutralizar asaltos frontales...",
        "curiosidad": "En la clave del arco exterior aún se puede observar labrada una llave simbólica de protección de la ciudad."
      },
      {
        "num": 2,
        "nombre": "Lienzo de Muralla Norte",
        "tiempo_parada": "15 min",
        "claves": "Técnica constructiva de tapial con argamasa de cal y arena de río. Espesor de 1,80 metros capaz de resistir asedios.",
        "audio_texto": "Este tramo de muralla septentrional data del periodo almohade. Desde esta altura se vigilaba el paso comercial de caravanas...",
        "curiosidad": "Las marcas de cantero grabadas en los sillares de base identificaban a los maestros de obra locales."
      },
      {
        "num": 3,
        "nombre": "Alminar de San Juan",
        "tiempo_parada": "25 min",
        "claves": "Estructura prismática de planta cuadrada, con decoración de paños de sebka y vanos geminados apuntados.",
        "audio_texto": "Frente a nosotros se alza el Alminar de San Juan, una joya del arte andalusí del siglo X que sobrevivió a la reconversión eclesiástica posterior...",
        "curiosidad": "En su interior se conserva la rampa helicoidal original por donde el almuédano ascendía a la llamada a la oración."
      },
      {
        "num": 4,
        "nombre": "Placeta del Aljibe",
        "tiempo_parada": "20 min",
        "claves": "Capacidad de almacenamiento de más de 120.000 litros. Bóveda de medio cañón con lucernarios para decantación.",
        "audio_texto": "Bajo nuestros pies late el corazón hídrico de la ciudad medieval. Este aljibe aseguraba el suministro durante largos asedios estivales...",
        "curiosidad": "El estuco interior de almagre rojo impermeable mantiene sus propiedades estancas tras más de 800 años."
      },
      {
        "num": 5,
        "nombre": "Torre del Homenaje",
        "tiempo_parada": "15 min",
        "claves": "Núcleo de mando de la fortaleza. Muro de sillería de doble hilera con cámara abovedada superior.",
        "audio_texto": "La Torre del Homenaje constituyó el último bastión inexpugnable del recinto militar...",
        "curiosidad": "En el suelo de la cámara alta existía una trampilla secreta conectada a galerías de escape subterráneas."
      },
      {
        "num": 6,
        "nombre": "Mirador del Alminar Mayor",
        "tiempo_parada": "10 min",
        "claves": "Punto de confluencia visual entre el urbanismo orgánico islámico y el trazado ortogonal renacentista.",
        "audio_texto": "Concluimos en este mirador privilegiado donde la vista abraza el perfil de tejados árabes, campanarios y la vega fértil...",
        "curiosidad": "La orientación de este punto coincide con la alineación astronómica del solsticio de invierno."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🚰",
        "nombre": "Fuentes de agua potable",
        "desc": "Disponibles en Paradas 1, 4 y 6 (red municipal tratada)."
      },
      {
        "icono": "🚻",
        "nombre": "Aseos públicos adaptados",
        "desc": "Centro de Recepción de Visitantes (P1) y Torre del Homenaje (P5)."
      },
      {
        "icono": "🚌",
        "nombre": "Transporte público",
        "desc": "Líneas de autobús urbano L1 y L3 con parada a 50m del inicio."
      },
      {
        "icono": "🏥",
        "nombre": "Punto de primeros auxilios",
        "desc": "Botiquín y desfibrilador DEA en oficina de turismo de Puerta de la Villa."
      },
      {
        "icono": "🍽️",
        "nombre": "Hostelería y comercio local",
        "desc": "Teterías tradicionales y tabernas con gastronomía andalusí en el entorno de P3 y P4."
      }
    ],
    "recomendaciones": [
      "Llevar calzado cómodo con suela de goma antideslizante para el pavimento empedrado tradicional.",
      "En meses de verano, realizar la ruta a primera hora de la mañana o al atardecer para disfrutar de temperaturas agradables.",
      "Llevar botella reutilizable; hay fuentes de recarga gratuita a lo largo de todo el itinerario.",
      "Respetar el descanso de los vecinos en las zonas residenciales del casco antiguo."
    ],
    "sostenibilidad": [
      "Ruta 100% peatonal con huella de carbono cero en su ejecución.",
      "Puntos de reciclaje selectivo ubicados en cada parada principal.",
      "Promoción del comercio de artesanía local y repostería artesanal tradicional.",
      "Iluminación nocturna de monumentos mediante proyectores LED solares de bajo impacto lumínico."
    ],
    "autoria": "Francisco José Bermejo Tarifa - DIseño Gráfico - Olimpo II"
  },
  {
    "id": "ruta-2",
    "slug": "ruta-agua-castanares",
    "file": "routes/ruta-2-agua-castanares.html",
    "nombre": "Ruta del Agua, Fuentes y Castañares Centenarios",
    "eslogan": "El susurro de los manantiales bajo la sombra del bosque autóctono",
    "tematica": "Ecoturismo, Botánica y Geología de Montaña",
    "descripcion": "Itinerario de senderismo suave que discurre entre centenarios bancales de castaños, acequias de careo de origen morisco y manantiales kársticos de montaña. El recorrido pone en valor la biodiversidad riparia, el ciclo hídrico en alta cota y la arquitectura tradicional de bancales de piedra seca declarada Patrimonio Inmaterial de la Humanidad.",
    "publico": "Familias, senderistas de nivel iniciación, fotógrafos de naturaleza, amantes de la botánica y grupos escolares.",
    "duracion": "3 horas y 30 minutos",
    "distancia": "6,8 km",
    "dificultad": "Media-Baja (Sendero forestal regular)",
    "dificultad_class": "diff-media",
    "accesibilidad": "Mixta - Sendero de tierra compactada con tramos empedrados y pasarelas de madera protegidas",
    "inicio_final": "Inicio en Fuente del Caño Real / Final en Cascada del Molino de la Hoya",
    "numero_paradas": 7,
    "bg_gradient": "linear-gradient(135deg, #15803d 0%, #064e3b 100%)",
    "mapa": {
      "viewBox": "0 0 800 350",
      "svgPath": "M 70,280 C 160,260 220,180 300,200 S 460,260 540,150 S 680,180 730,70",
      "puntos": [
        {
          "num": 1,
          "x": 80,
          "y": 270,
          "name": "Fuente del Caño Real",
          "label_y": 310
        },
        {
          "num": 2,
          "x": 190,
          "y": 210,
          "name": "Acequia de las Eras",
          "label_y": 170
        },
        {
          "num": 3,
          "x": 300,
          "y": 195,
          "name": "El Castaño Abuelo",
          "label_y": 240
        },
        {
          "num": 4,
          "x": 420,
          "y": 225,
          "name": "Manantial de la Salud",
          "label_y": 270
        },
        {
          "num": 5,
          "x": 520,
          "y": 145,
          "name": "Mirador de las Cascadas",
          "label_y": 105
        },
        {
          "num": 6,
          "x": 630,
          "y": 165,
          "name": "Bancales de Piedra Seca",
          "label_y": 210
        },
        {
          "num": 7,
          "x": 720,
          "y": 70,
          "name": "Cascada Molino de la Hoya",
          "label_y": 35
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Fuente del Caño Real y Abrevadero Tradicional",
        "tiempo": "00:00 - 00:25",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Manantial principal del pueblo con pilón de tres caños labrado en granito del siglo XVIII."
      },
      {
        "parada": 2,
        "titulo": "Acequia de las Eras y Sistema de Riego Vivo",
        "tiempo": "00:35 - 01:00",
        "distancia_tramo": "1,1 km",
        "descripcion": "Canalización tradicional abierta por donde discurre el deshielo hacia las huertas escalonadas."
      },
      {
        "parada": 3,
        "titulo": "El Castaño Abuelo (Ejemplar Monumental)",
        "tiempo": "01:10 - 01:40",
        "distancia_tramo": "1,3 km",
        "descripcion": "Árbol singular de más de 9 metros de perímetro de tronco catalogado como patrimonio botánico."
      },
      {
        "parada": 4,
        "titulo": "Manantial de la Salud y Coto de Helechos",
        "tiempo": "01:50 - 02:15",
        "distancia_tramo": "1,2 km",
        "descripcion": "Surgencia kárstica rodeada de un microbosque de laurisilva relicta y helechos reales."
      },
      {
        "parada": 5,
        "titulo": "Mirador de las Cascadas y Garganta del Río",
        "tiempo": "02:25 - 02:45",
        "distancia_tramo": "1,0 km",
        "descripcion": "Balcón de madera natural con vistas al cañón fluvial y nidos de avifauna rupícola."
      },
      {
        "parada": 6,
        "titulo": "Bancales de Piedra Seca y Tinaos de Pastores",
        "tiempo": "02:50 - 03:10",
        "distancia_tramo": "1,1 km",
        "descripcion": "Ingeniería popular de contención de laderas sin uso de cemento, hábitat de reptiles y polinizadores."
      },
      {
        "parada": 7,
        "titulo": "Cascada del Molino de la Hoya",
        "tiempo": "03:15 - 03:30",
        "distancia_tramo": "1,1 km (Final)",
        "descripcion": "Salto de agua de 14 metros y restos del molino harinero hidráulico del siglo XIX."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Fuente del Caño Real",
        "tiempo_parada": "25 min",
        "claves": "Agua de mineralización muy débil procedente de acuíferos de cuarcitas; caudal continuo de 18 litros por minuto.",
        "audio_texto": "Bienvenidos a la Ruta del Agua. Aquí en la Fuente del Caño Real, las comunidades serranas se abastecían y daban de beber al ganado antes de iniciar la ascensión...",
        "curiosidad": "La temperatura del agua se mantiene exactamente a 12°C tanto en pleno invierno como en la canícula de agosto."
      },
      {
        "num": 2,
        "nombre": "Acequia de las Eras",
        "tiempo_parada": "25 min",
        "claves": "Ingeniería de 'careo': siembra de agua en las cumbres para recargar manantiales en los meses secos.",
        "audio_texto": "Caminen junto a esta acequia milenaria. Los acequieros regulan el agua mediante compuertas de madera llamadas partidores...",
        "curiosidad": "El reparto del agua se mide aún hoy mediante 'turnos de sol a sol' fijados en asambleas comunales de regantes."
      },
      {
        "num": 3,
        "nombre": "El Castaño Abuelo",
        "tiempo_parada": "30 min",
        "claves": "Castanea sativa centenario; copa de más de 25 metros de diámetro y nido habitual de cárabo común y pito real.",
        "audio_texto": "Contemplen este coloso vivo. Este castaño ha sido testigo de más de cinco siglos de historia y proporcionó el alimento básico de generaciones...",
        "curiosidad": "Su tronco hueco sirvió como refugio temporal de pastores frente a tormentas de nieve en el siglo XIX."
      },
      {
        "num": 4,
        "nombre": "Manantial de la Salud",
        "tiempo_parada": "25 min",
        "claves": "Presencia de Osmunda regalis (helecho real) y triturón pirenaico/ibérico, bioindicadores de pureza ambiental máxima.",
        "audio_texto": "En esta hondonada sombría brota el Manantial de la Salud. El ambiente húmedo propicia un sotobosque de musgos y líquenes de gran valor ecológico...",
        "curiosidad": "Las aguas de este manantial eran embotelladas a principios del siglo XX por sus reconocidas propiedades digestivas."
      },
      {
        "num": 5,
        "nombre": "Mirador de las Cascadas",
        "tiempo_parada": "20 min",
        "claves": "Punto de observación ornitológica: águila calzada, mirlo acuático y lavandera cascadeña.",
        "audio_texto": "Asómense a la garganta. La fuerza erosiva del torrente ha tallado profundas pozas llamadas 'marmitas de gigante'...",
        "curiosidad": "En los cortados rocosos de enfrente anidan parejas de halcón peregrino durante la primavera."
      },
      {
        "num": 6,
        "nombre": "Bancales de Piedra Seca",
        "tiempo_parada": "20 min",
        "claves": "UNESCO Patrimonio Cultural Inmaterial; microhábitats para salamanquesas, escarabajos joya y flora rupícola.",
        "audio_texto": "Cada piedra de estos muros encaja por pura gravedad, permitiendo drenar el agua sin provocar corrimientos de tierra...",
        "curiosidad": "Los muros de piedra seca aumentan la temperatura del suelo nocturno, protegiendo a los árboles de heladas tardías."
      },
      {
        "num": 7,
        "nombre": "Cascada del Molino de la Hoya",
        "tiempo_parada": "15 min",
        "claves": "Fuerza motriz hidráulica aplicada a la molienda de trigo y castañas; salto de agua en toba calcárea.",
        "audio_texto": "Hemos llegado al broche de oro de la ruta. La cascada forma una balsa natural esmeralda junto a la vieja sala de muelas del molino...",
        "curiosidad": "La toba calcárea de la cascada es una roca viva que sigue creciendo milímetro a milímetro por la precipitación del carbonato cálcico."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🚰",
        "nombre": "Fuentes naturales",
        "desc": "Agua de manantial en P1 y P4 (se recomienda botella con filtro o pastilla potabilizadora por precaución en monte abierto)."
      },
      {
        "icono": "🅿️",
        "nombre": "Aparcamiento disuasorio",
        "desc": "Parking ecológico gratuito con 40 plazas en el inicio de ruta (P1)."
      },
      {
        "icono": "🪑",
        "nombre": "Áreas de descanso y picnic",
        "desc": "Mesas de madera y sombras habilitadas en P3 (Castaño Abuelo) y P5."
      },
      {
        "icono": "📶",
        "nombre": "Cobertura móvil y SOS",
        "desc": "Cobertura 4G/5G en el 70% del trazado; poste de auxilio SOS geolocalizado en P5."
      },
      {
        "icono": "🦯",
        "nombre": "Bastones de apoyo",
        "desc": "Punto de préstamo de bastones de senderismo de madera en el quiosco de recepción."
      }
    ],
    "recomendaciones": [
      "Llevar calzado de montaña con buen agarre y protección para tobillos.",
      "Llevar capa de abrigo ligera y chubasquero, ya que la temperatura en el bosque de castaños desciende de 4 a 6°C.",
      "Prohibido recolectar setas, castañas o plantas sin el permiso municipal correspondiente.",
      "No abandonar el sendero balizado para evitar la erosión de las laderas y proteger los semilleros naturales."
    ],
    "sostenibilidad": [
      "Regulación de aforo diario para evitar la masificación y preservar la tranquilidad de la fauna.",
      "Sendero mantenido con materiales 100% locales (madera de castaño tratada al vapor y piedra local).",
      "Programa 'Basura Cero': cada visitante se responsabiliza de retornar sus residuos al pueblo.",
      "Reforestación anual con plantones autóctonos financiada con las visitas ecoturísticas."
    ],
    "autoria": "Francisco José Bermejo Tarifa - DIseño Gráfico - Olimpo II"
  },
  {
    "id": "ruta-3",
    "slug": "ruta-sabores-aceite",
    "file": "routes/ruta-3-sabores-aceite.html",
    "nombre": "Ruta de los Sabores Tradicionales y Cultura del Aceite",
    "eslogan": "El legado del oro líquido, las almazaras vivas y la cocina de la tierra",
    "tematica": "Enoturismo, Gastronomía Popular y Cultura Rural",
    "descripcion": "Experiencia sensorial y cultural a través de olivares centenarios de variedades autóctonas, almazaras históricas con prensas de viga y quintal, hornos comunales de leña y talleres de cata guiada. La ruta sumerge al visitante en la Dieta Mediterránea, las técnicas tradicionales de conservación y los aromas de la huerta tradicional.",
    "publico": "Gourmets, parejas, familias con niños, grupos de amigos y amantes de la cocina tradicional y el agroturismo.",
    "duracion": "2 horas y 45 minutos",
    "distancia": "4,2 km",
    "dificultad": "Baja (Caminos rurales llanos y calles empedradas)",
    "dificultad_class": "diff-baja",
    "accesibilidad": "Accesible para todos los públicos y personas en silla de ruedas en instalaciones y almazaras.",
    "inicio_final": "Inicio en Museo Almazara La Encomienda / Final en Plaza del Horno Comunal",
    "numero_paradas": 5,
    "bg_gradient": "linear-gradient(135deg, #d97706 0%, #78350f 100%)",
    "mapa": {
      "viewBox": "0 0 800 350",
      "svgPath": "M 90,240 Q 220,120 340,210 T 520,140 T 710,180",
      "puntos": [
        {
          "num": 1,
          "x": 90,
          "y": 230,
          "name": "Museo Almazara La Encomienda",
          "label_y": 275
        },
        {
          "num": 2,
          "x": 240,
          "y": 130,
          "name": "Olivares Centenarios",
          "label_y": 90
        },
        {
          "num": 3,
          "x": 380,
          "y": 200,
          "name": "Bodega y Lagar Histórico",
          "label_y": 245
        },
        {
          "num": 4,
          "x": 530,
          "y": 135,
          "name": "Huerta Ecológica",
          "label_y": 95
        },
        {
          "num": 5,
          "x": 700,
          "y": 170,
          "name": "Plaza del Horno Comunal",
          "label_y": 215
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Museo Almazara La Encomienda (Siglo XVII)",
        "tiempo": "00:00 - 00:40",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Visita a la prensa de viga de 12 metros de longitud y bodega de tinajas enterradas."
      },
      {
        "parada": 2,
        "titulo": "Olivares Centenarios y Aula de Campo",
        "tiempo": "00:45 - 01:15",
        "distancia_tramo": "1,2 km",
        "descripcion": "Taller interactivo de reconocimiento de hojas, maduración del fruto y poda tradicional."
      },
      {
        "parada": 3,
        "titulo": "Bodega Subterránea y Lagar de Vinos de la Tierra",
        "tiempo": "01:25 - 01:55",
        "distancia_tramo": "1,0 km",
        "descripcion": "Cata iniciática de dos Aceites de Oliva Virgen Extra (AOVE) tempranos y vino de tinaja."
      },
      {
        "parada": 4,
        "titulo": "Huerta Ecológica y Bancal de Aromáticas",
        "tiempo": "02:05 - 02:25",
        "distancia_tramo": "1,1 km",
        "descripcion": "Recolección aromática (tomillo, romero, orégano silvestre) para la maceración de aceites."
      },
      {
        "parada": 5,
        "titulo": "Plaza del Horno Comunal y Degustación de Pan de Leña",
        "tiempo": "02:30 - 02:45",
        "distancia_tramo": "0,9 km (Final)",
        "descripcion": "Horneado en directo y degustación del tradicional 'canto de pan tostado' con AOVE y tomate de la huerta."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Museo Almazara La Encomienda",
        "tiempo_parada": "40 min",
        "claves": "Maquinaria preindustrial completa: muela cónica empiedro, capachos de esparto y prensa hidráulica.",
        "audio_texto": "Bienvenidos a la catedral del aceite. En esta almazara señorial se procesaban más de 200 quintales de aceituna en cada campaña...",
        "curiosidad": "Las tinajas de barro cocido estaban enterradas hasta el cuello para mantener el aceite a 16°C constantes y evitar su oxidación."
      },
      {
        "num": 2,
        "nombre": "Olivares Centenarios",
        "tiempo_parada": "30 min",
        "claves": "Variedad morisca autóctona de alto contenido en polifenoles y ácido oleico; cultivo en secano con cubierta vegetal viva.",
        "audio_texto": "Nos adentramos en este mar de olivos. Fíjense en la corteza rugosa y los troncos trenzados por los siglos...",
        "curiosidad": "Un solo olivo de esta parcela produce aceite suficiente para abastecer a una familia durante todo un año."
      },
      {
        "num": 3,
        "nombre": "Bodega y Lagar Histórico",
        "tiempo_parada": "30 min",
        "claves": "Panel de cata profesional: atributos positivos (frutado verde, amargo, picante) y maridaje gastronómico.",
        "audio_texto": "Calienten la copa de cata azul en la palma de su mano para liberar los compuestos volátiles de tomatera y almendra verde...",
        "curiosidad": "Las copas de cata oficiales son de color azul cobalto para que el catador no se deje influir por el color del aceite."
      },
      {
        "num": 4,
        "nombre": "Huerta Ecológica",
        "tiempo_parada": "20 min",
        "claves": "Rotación de cultivos, hotel de insectos polinizadores y compostaje orgánico de alperujo.",
        "audio_texto": "En esta huerta viva se recuperan variedades hortícolas tradicionales casi extintas...",
        "curiosidad": "El alperujo, residuo de la molturación, se recicla aquí como abono rico en potasio para fertilizar la tierra."
      },
      {
        "num": 5,
        "nombre": "Plaza del Horno Comunal",
        "tiempo_parada": "15 min",
        "claves": "Masa madre de harina de trigo candeal molida a la piedra; cocción en horno de leña de poda de olivo.",
        "audio_texto": "El aroma a pan recién horneado nos da la bienvenida. Disfruten de la combinación perfecta: pan crujiente, AOVE y sal marina...",
        "curiosidad": "Cada familia marcaba antiguamente sus panes con un sello de madera único antes de introducirlos al horno común."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "♿",
        "nombre": "Accesibilidad Universal",
        "desc": "Todas las almazaras y salas de cata disponen de accesos a cota cero y aseos adaptados."
      },
      {
        "icono": "🛒",
        "nombre": "Tienda directa de productores",
        "desc": "Venta de AOVE con denominación de origen protegida, miel de romero y panadería artesanal."
      },
      {
        "icono": "🍴",
        "nombre": "Restaurantes recomendados",
        "desc": "3 mesones con menús degustación 'Kilómetro 0' adheridos a la ruta."
      },
      {
        "icono": "👶",
        "nombre": "Talleres infantiles",
        "desc": "Espacio de elaboración de mini-panecillos y jabón artesanal de aceite para niños."
      },
      {
        "icono": "💳",
        "nombre": "Servicios de pago",
        "desc": "Todos los puntos aceptan pagos con tarjeta, móvil y efectivo."
      }
    ],
    "recomendaciones": [
      "Evitar perfumes fuertes o fumar antes de la cata para no alterar la sensibilidad olfativa.",
      "Ruta apta para carritos de bebé y personas mayores.",
      "Consultar horarios de molienda en directo si se visita entre los meses de noviembre y enero.",
      "Llevar bolsa reutilizable de tela para las compras en los obradores locales."
    ],
    "sostenibilidad": [
      "Economía circular: aprovechamiento de los huesos de aceituna como biocombustible para calefacción.",
      "Comercio justo directo sin intermediarios, remunerando dignamente a los agricultores locales.",
      "Uso de envases de vidrio oscuro reciclable y etiquetas de papel certificado FSC.",
      "Tratamientos fitosanitarios 100% biológicos basados en trampas ecológicas."
    ],
    "autoria": "Francisco José Bermejo Tarifa - DIseño Gráfico - Olimpo II"
  },
  {
    "id": "ruta-4",
    "slug": "senda-costera-torres",
    "file": "routes/ruta-4-acantilados-torres.html",
    "nombre": "Senda Costera de los Acantilados y Torres Vigía",
    "eslogan": "Centinelas de roca frente al mar, brisa marina y geología viva",
    "tematica": "Paisaje Litoral, Geoparques y Arqueología Marítima",
    "descripcion": "Recorrido panorámico al borde del litoral agreste que une históricas torres vigía del siglo XVI levantadas para la alerta temprana frente a incursiones berberiscas. El trazado atraviesa calas fósiles, acantilados de roca volcánica y plataformas de abrasión marina con una rica avifauna litoral.",
    "publico": "Senderistas, fotógrafos, amantes del mar, observadores de aves y geólogos aficionados.",
    "duracion": "3 horas y 15 minutos",
    "distancia": "5,6 km",
    "dificultad": "Media (Sendero costero con desniveles moderados y escalinatas)",
    "dificultad_class": "diff-media",
    "accesibilidad": "Sendero natural no adaptado para sillas de ruedas; tramo inicial de 1 km accesible para todos.",
    "inicio_final": "Inicio en Faro del Cabo / Final en Cala de la Torre Vigía Alta",
    "numero_paradas": 6,
    "bg_gradient": "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    "mapa": {
      "viewBox": "0 0 800 350",
      "svgPath": "M 80,180 Q 220,260 360,150 T 550,220 T 720,110",
      "puntos": [
        {
          "num": 1,
          "x": 85,
          "y": 175,
          "name": "Faro del Cabo y Balcón",
          "label_y": 135
        },
        {
          "num": 2,
          "x": 220,
          "y": 225,
          "name": "Torre Vigía de la Cala",
          "label_y": 270
        },
        {
          "num": 3,
          "x": 360,
          "y": 145,
          "name": "Plataforma de Fósiles",
          "label_y": 105
        },
        {
          "num": 4,
          "x": 480,
          "y": 185,
          "name": "Cala Secreta y Ensenada",
          "label_y": 230
        },
        {
          "num": 5,
          "x": 600,
          "y": 205,
          "name": "Dunas Fósiles y Arrecife",
          "label_y": 250
        },
        {
          "num": 6,
          "x": 715,
          "y": 105,
          "name": "Torre Vigía Alta del Cantil",
          "label_y": 65
        }
      ]
    },
    "itinerario": [
      {
        "parada": 1,
        "titulo": "Faro del Cabo y Balcón Oceánico",
        "tiempo": "00:00 - 00:25",
        "distancia_tramo": "0,0 km (Inicio)",
        "descripcion": "Señal marítima activa con linterna giratoria y centro de interpretación del litoral."
      },
      {
        "parada": 2,
        "titulo": "Torre Vigía de la Cala Baja",
        "tiempo": "00:35 - 01:05",
        "distancia_tramo": "1,1 km",
        "descripcion": "Estructura cónica de mampostería con acceso elevado por escala de cuerda."
      },
      {
        "parada": 3,
        "titulo": "Plataforma de Fósiles Marinos del Mioceno",
        "tiempo": "01:15 - 01:45",
        "distancia_tramo": "1,2 km",
        "descripcion": "Estrato geológico con restos fosilizados de bivalvos gigantes y corales de mares cálidos."
      },
      {
        "parada": 4,
        "titulo": "Cala Secreta y Casetas de Barcas",
        "tiempo": "01:55 - 02:25",
        "distancia_tramo": "1,0 km",
        "descripcion": "Refugio natural de pesca artesanal con varaderos de madera y aguas transparentes."
      },
      {
        "parada": 5,
        "titulo": "Dunas Fósiles y Ecosistema de Limonium",
        "tiempo": "02:35 - 02:55",
        "distancia_tramo": "1,1 km",
        "descripcion": "Formaciones eólicas petrificadas y plantas halófilas adaptadas al salitre extremo."
      },
      {
        "parada": 6,
        "titulo": "Torre Vigía Alta del Cantil y Puesta de Sol Marina",
        "tiempo": "03:00 - 03:15",
        "distancia_tramo": "1,2 km (Final)",
        "descripcion": "Cumbre del acantilado a 95 metros sobre el nivel del mar con horizonte infinito."
      }
    ],
    "fichas_paradas": [
      {
        "num": 1,
        "nombre": "Faro del Cabo",
        "tiempo_parada": "25 min",
        "claves": "Óptica catadióptrica de Fresnel; alcance luminoso de 22 millas náuticas.",
        "audio_texto": "Iniciamos la senda marina en este promontorio donde la tierra se adentra en las aguas abiertas...",
        "curiosidad": "El farero de guardia enviaba avisos meteorológicos mediante telegrafía de banderas antes de la radio."
      },
      {
        "num": 2,
        "nombre": "Torre Vigía de la Cala Baja",
        "tiempo_parada": "30 min",
        "claves": "Sistema de señales de humo de día y fuego de noche que recorría 200 km de costa en 40 minutos.",
        "audio_texto": "Dos torreros armados habitaban permanentemente esta atalaya, vigilando cualquier vela en el horizonte...",
        "curiosidad": "La puerta de entrada estaba situada a 6 metros de altura y solo se accedía retirando una escala de cuerda."
      },
      {
        "num": 3,
        "nombre": "Plataforma de Fósiles Marinos",
        "tiempo_parada": "30 min",
        "claves": "Rocas calcarenitas con icnofósiles y restos de arrecifes coralinos de hace 6 millones de años.",
        "audio_texto": "Observen la roca bajo sus pies: estamos caminando sobre el lecho de un antiguo mar tropical que emergió por empuje tectónico...",
        "curiosidad": "Se pueden apreciar moldes perfectos de pectínidos y dientes de tiburón fósil integrados en la matriz rocosa."
      },
      {
        "num": 4,
        "nombre": "Cala Secreta y Ensenada de Pescadores",
        "tiempo_parada": "30 min",
        "claves": "Pesca de bajura con trasmallo selectivo; hábitat de praderas de Posidonia oceanica.",
        "audio_texto": "Esta cala abrigada del viento de levante servía de fondeadero de emergencia para jábegas y barcas de jábega...",
        "curiosidad": "Las praderas de Posidonia sumergidas frente a la cala son responsables de la asombrosa transparencia del agua."
      },
      {
        "num": 5,
        "nombre": "Dunas Fósiles y Arrecife",
        "tiempo_parada": "20 min",
        "claves": "Endemismo vegetal: Siempreviva marítima (Limonium) y azucena de mar protegida.",
        "audio_texto": "Las arenas calcáreas petrificadas forman caprichosas esculturas modeladas por el viento salino...",
        "curiosidad": "Estas plantas son capaces de expulsar el exceso de sal marina a través de microscópicas glándulas en sus hojas."
      },
      {
        "num": 6,
        "nombre": "Torre Vigía Alta del Cantil",
        "tiempo_parada": "15 min",
        "claves": "Vértice geodésico de primer orden; avistamiento habitual de delfines mulares en paso.",
        "audio_texto": "En la cúspide del cantil coronamos la ruta. El horizonte abierto nos regala un atardecer inolvidable...",
        "curiosidad": "En días despejados de invierno es posible divisar la silueta de las montañas del norte de África en el horizonte."
      }
    ],
    "recursos_servicios": [
      {
        "icono": "🚗",
        "nombre": "Punto de acceso y transporte",
        "desc": "Aparcamiento regulado en Faro del Cabo y parada de bus interurbano costero."
      },
      {
        "icono": "🛟",
        "nombre": "Seguridad marítima y socorrismo",
        "desc": "Puesto de socorrismo de Cruz Roja en Cala Secreta durante temporada estival."
      },
      {
        "icono": "🕶️",
        "nombre": "Miradores con catalejos",
        "desc": "Telescopios panorámicos gratuitos de largo alcance en Paradas 1 y 6."
      },
      {
        "icono": "🚤",
        "nombre": "Paseos en barco ecológico",
        "desc": "Servicio de retorno náutico con propulsión eléctrica desde Cala Secreta al puerto."
      },
      {
        "icono": "🧴",
        "nombre": "Protección y avituallamiento",
        "desc": "Dispensador solar gratuito de crema protectora biodegradable en el inicio."
      }
    ],
    "recomendaciones": [
      "Protegerse del sol: usar sombrero, gafas con filtro UV y aplicar crema solar biodegradable.",
      "Llevar suficiente agua potable (mínimo 1,5 litros por persona); en el cantil no hay fuentes continuas.",
      "Mantenerse siempre a más de 3 metros del borde de los acantilados por riesgo de ráfagas repentinas de viento.",
      "Respetar las dunas fósiles y no pisar la vegetación litoral protegida."
    ],
    "sostenibilidad": [
      "Protección activa de las praderas submarinas de Posidonia oceanica (sumidero de CO2).",
      "Campaña 'Playa Sin Humo y Sin Plásticos': prohibición estricta de plásticos desechables.",
      "Paneles informativos fabricados con plásticos marinos reciclados recogidos en limpiezas de costas.",
      "Monitoreo constante de nidificación del cormorán moñudo y gaviota de Audouin."
    ],
    "autoria": "Francisco José Bermejo Tarifa - DIseño Gráfico - Olimpo II"
  }
];
