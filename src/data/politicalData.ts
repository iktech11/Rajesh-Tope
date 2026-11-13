import type { Milestone, Portfolio, DevelopmentProject } from '../types';

export const milestones: Milestone[] = [
  {
    id: 'm-1996',
    year: '1996',
    category: 'election',
    title: {
      mr: 'संसदीय निवडणूक अनुभव – राजकीय पदार्पण',
      en: 'Initial Lok Sabha Electoral Engagement',
      hi: 'प्रारंभिक संसदीय चुनावी अनुभव'
    },
    role: {
      mr: 'लोकसभा उमेदवार',
      en: 'Lok Sabha Candidate',
      hi: 'लोकसभा प्रत्याशी'
    },
    description: {
      mr: 'तरुण वयात सार्वजनिक नेतृत्वाचा अनुभव घेत जालना लोकसभा मतदारसंघातून निवडणूक लढवून जनसंवादाची पहिली मोठी पायरी गाठली.',
      en: 'Marked early leadership engagement by contesting the parliamentary election, building grassroots organizational ties across Jalna.',
      hi: 'युवा अवस्था में जालना संसदीय क्षेत्र से चुनाव लड़कर जनसंपर्क और संगठनात्मक नेतृत्व की शुरुआत की।'
    },
    highlights: {
      mr: ['जालना जिल्ह्यातील ग्रामीण भागाचा सखोल दौरा', 'शेतकरी व युवकांच्या प्रश्नांना प्रथम प्राधान्य'],
      en: ['Extensive grassroots outreach across rural Jalna', 'Prioritizing agrarian and youth issues'],
      hi: ['ग्रामीण जालना का सघन दौरा', 'किसानों और युवाओं के मुद्दों को प्राथमिकता']
    }
  },
  {
    id: 'm-1999',
    year: '1999',
    category: 'assembly',
    title: {
      mr: 'महाराष्ट्र विधानसभेत प्रथमच विजय',
      en: 'Elected to Maharashtra Legislative Assembly',
      hi: 'महाराष्ट्र विधानसभा के लिए प्रथम निर्वाचन'
    },
    role: {
      mr: 'विधानसभा सदस्य (आमदार)',
      en: 'Member of Legislative Assembly (MLA)',
      hi: 'विधानसभा सदस्य (विधायक)'
    },
    description: {
      mr: 'स्थानिक जनतेचा प्रचंड विश्वास संपादन करत विधानसभा निवडणुकीत विजय मिळवला आणि मतदारसंघाच्या विकासाचा नवा अध्याय सुरू केला.',
      en: 'Secured a decisive electoral mandate to enter the Maharashtra Legislative Assembly, initiating modern rural infrastructure projects.',
      hi: 'जनता के विश्वास से विधानसभा में प्रथम बार निर्वाचित होकर ग्रामीण बुनियादी ढांचे का नया अध्याय प्रारंभ किया।'
    },
    highlights: {
      mr: ['ग्रामीण रस्ते व जलसंधारण कामांना प्राधान्य', 'सहकारी क्षेत्राला नवी गती'],
      en: ['Focus on rural connectivity and watershed development', 'Empowerment of agrarian cooperative societies'],
      hi: ['ग्रामीण संपर्क मार्ग और जल संरक्षण', 'सहकारी क्षेत्र को नई गति']
    }
  },
  {
    id: 'm-2001',
    year: '2001',
    category: 'ministry',
    title: {
      mr: 'महाराष्ट्र शासनात राज्यमंत्रिपदाची धुरा',
      en: 'Inducted as Minister of State',
      hi: 'महाराष्ट्र शासन में राज्यमंत्री पदभार'
    },
    role: {
      mr: 'राज्यमंत्री, महाराष्ट्र शासन',
      en: 'Minister of State, Govt. of Maharashtra',
      hi: 'राज्यमंत्री, महाराष्ट्र शासन'
    },
    description: {
      mr: 'कौशल्य, प्रशासकीय शिस्त आणि तळागाळातील प्रश्नांची जाण यांमुळे महाराष्ट्र मंत्रिमंडळात राज्यमंत्री म्हणून विविध खात्यांची महत्त्वपूर्ण जबाबदारी सोपवण्यात आली.',
      en: 'Entrusted with crucial portfolios as Minister of State in the Government of Maharashtra, streamlining department execution and rural welfare.',
      hi: 'प्रशासनिक दक्षता के आधार पर महाराष्ट्र सरकार में राज्यमंत्री के रूप में विभिन्न विभागों का दायित्व संभाला।'
    },
    highlights: {
      mr: ['प्रशासकीय कार्यक्षमतेत गतिशीलता', 'तरुण नेतृत्वाची राज्यपातळीवर दखल'],
      en: ['Streamlined administrative execution', 'Recognition as an emerging statewide dynamic leader'],
      hi: ['प्रशासनिक कार्यकुशलता में सुधार', 'राज्य स्तर पर प्रभावी नेतृत्व की पहचान']
    }
  },
  {
    id: 'm-2008',
    year: '2008–2014',
    category: 'ministry',
    title: {
      mr: 'उच्च व तंत्रशिक्षण कॅबिनेट मंत्रिपद',
      en: 'Cabinet Minister – Higher & Technical Education',
      hi: 'कैबिनेट मंत्री – उच्च एवं तकनीकी शिक्षा'
    },
    role: {
      mr: 'कॅबिनेट मंत्री, महाराष्ट्र शासन',
      en: 'Cabinet Minister, Govt. of Maharashtra',
      hi: 'कैबिनेट मंत्री, महाराष्ट्र शासन'
    },
    description: {
      mr: 'महाराष्ट्र राज्यातील उच्च आणि तंत्रशिक्षणाचा दर्जा उंचावण्यासाठी तंत्रशिक्षण संस्थांचे आधुनिकीकरण, परीक्षा पद्धतीतील संगणकीकरण आणि ग्रामीण विद्यार्थ्यांसाठी शिष्यवृत्ती योजना राबवल्या.',
      en: 'Spearheaded extensive reforms in higher education, computerized examination governance, expanded polytechnic colleges in rural regions, and strengthened student welfare.',
      hi: 'उच्च और तकनीकी शिक्षा में बड़े नीतिगत सुधार, परीक्षा प्रणाली का डिजिटलीकरण और ग्रामीण युवाओं हेतु तकनीकी संस्थानों का विस्तार किया।'
    },
    highlights: {
      mr: ['अभियांत्रिकी व तंत्रनिकेतन महाविद्यालयांचे जाळे', 'विद्यापीठ प्रशासनात संगणकीकरण व पारदर्शकता', 'ग्रामीण विद्यार्थ्यांसाठी वसतिगृह सुविधा'],
      en: ['Expansion of polytechnic and engineering colleges', 'Digitization in university examination systems', 'Hostel amenities for backward and rural students'],
      hi: ['इंजीनियरिंग एवं पॉलिटेक्निक संस्थानों का विस्तार', 'विश्वविद्यालय प्रणाली का आधुनिकीकरण', 'ग्रामीण छात्रों हेतु छात्रावास सुविधाएं']
    }
  },
  {
    id: 'm-2019-oath',
    year: '2019',
    category: 'leadership',
    title: {
      mr: 'कॅबिनेट मंत्री म्हणून शपथविधी',
      en: 'Sworn in as Cabinet Minister in Maharashtra',
      hi: 'महाराष्ट्र में कैबिनेट मंत्री के रूप में शपथ ग्रहण'
    },
    role: {
      mr: 'कॅबिनेट मंत्री, महाराष्ट्र शासन',
      en: 'Cabinet Minister, Govt. of Maharashtra',
      hi: 'कैबिनेट मंत्री, महाराष्ट्र शासन'
    },
    description: {
      mr: 'महाविकास आघाडी शासनात वरिष्ठ कॅबिनेट मंत्री म्हणून शपथ घेतली आणि राज्याच्या सर्वात नाजूक अशा आरोग्य व्यवस्थेचे नेतृत्व स्वीकारले.',
      en: 'Inducted as senior Cabinet Minister in the Maharashtra Government, taking helm of state public health institutions and family welfare.',
      hi: 'महाराष्ट्र सरकार में वरिष्ठ कैबिनेट मंत्री के रूप में शपथ ग्रहण कर राज्य की स्वास्थ्य सेवाओं का नेतृत्व संभाला।'
    }
  },
  {
    id: 'm-2019-health',
    year: '2019–2022',
    category: 'ministry',
    title: {
      mr: 'सार्वजनिक आरोग्य व कुटुंब कल्याण मंत्री',
      en: 'Minister of Public Health & Family Welfare',
      hi: 'सार्वजनिक स्वास्थ्य एवं परिवार कल्याण मंत्री'
    },
    role: {
      mr: 'आरोग्यमंत्री, महाराष्ट्र शासन',
      en: 'Health Minister, Govt. of Maharashtra',
      hi: 'स्वास्थ्य मंत्री, महाराष्ट्र शासन'
    },
    description: {
      mr: 'कोविड-१९ च्या शतकातील सर्वात भीषण महासंकटात २४ तास कार्यरत राहून दररोज थेट जनतेशी संवाद साधला. ऑक्सिजन प्रकल्पांची उभारणी, मोफत उपचार योजना आणि लसीकरण मोहिमेत महाराष्ट्राला अव्वल स्थान मिळवून दिले.',
      en: 'Steered Maharashtra through the global COVID-19 pandemic with daily transparent media briefings, rapid establishment of PSA oxygen plants, statewide beds tracking, and massive vaccination drives.',
      hi: 'कोविड-१९ संकट में प्रतिदिन पारदर्शी प्रेस वार्ताएं, ऑक्सीजन संयंत्रों की स्थापना, मुफ्त इलाज योजनाओं का विस्तार और कुशल प्रबंधन।'
    },
    highlights: {
      mr: ['दररोज थेट जनतेशी पारदर्शक संवाद व पत्रकार परिषदा', '‘माझे कुटुंब, माझी जबाबदारी’ आरोग्य सर्व्हे मोहीम', 'महात्मा ज्योतिराव फुले जन आरोग्य योजनेचा १००% विस्तार', 'जिल्हा रुग्णालयांमध्ये लिक्विड ऑक्सिजन प्लांट उभारणी'],
      en: ['Daily transparent public briefings and calm leadership', '"My Family, My Responsibility" statewide door-to-door health survey', 'Universal expansion of Mahatma Jyotirao Phule Jan Arogya Yojana', 'Rapid installation of liquid medical oxygen units across civil hospitals'],
      hi: ['प्रतिदिन पारदर्शी संवाद और शांत नेतृत्व', '"मेरा परिवार, मेरी जिम्मेदारी" राज्यव्यापी सर्वेक्षण', 'मुफ्त स्वास्थ्य बीमा योजना का व्यापक विस्तार', 'जिला अस्पतालों में ऑक्सीजन संयंत्रों का नेटवर्क']
    }
  },
  {
    id: 'm-2019-2024',
    year: '2019–2024',
    category: 'assembly',
    title: {
      mr: 'घनसावंगी विधानसभा मतदारसंघाचे प्रतिनिधित्व',
      en: 'Represented Ghansawangi in Maharashtra Assembly',
      hi: 'घनसावंगी विधानसभा क्षेत्र का प्रतिनिधित्व'
    },
    role: {
      mr: 'माजी विधानसभा सदस्य (आमदार)',
      en: 'Former Member of Legislative Assembly',
      hi: 'पूर्व विधानसभा सदस्य (विधायक)'
    },
    description: {
      mr: '२०१९ ते २०२४ या कार्यकाळात घनसावंगी विधानसभा मतदारसंघाचे अधिकृत लोकप्रतिनिधी म्हणून सिंचन कालवे, ग्रामीण रस्ते, उपसा सिंचन योजना आणि शिक्षण संस्थांचा मोठ्या प्रमाणावर विकास केला.',
      en: 'Served as the elected MLA representing Ghansawangi throughout the 2019–2024 legislative term, securing state sanctions for lift irrigation, village roads, and modern agrarian facilities.',
      hi: '२०१९ से २०२४ तक घनसावंगी विधानसभा का प्रतिनिधित्व करते हुए सिंचाई, ग्रामीण सड़कों और शैक्षणिक ढांचे का ऐतिहासिक विकास किया।'
    },
    highlights: {
      mr: ['गोदावरी खोरे उपसा सिंचन योजनांना गती', 'तालुक्यातील ग्रामीण रस्त्यांचे काँक्रीटीकरण', 'शेतकऱ्यांना वीज व पाणी पुरवठ्याचे नियोजन'],
      en: ['Accelerated Godavari basin lift irrigation works', 'Upgradation of rural taluka road corridors', 'Structured agricultural power and water feeder distribution'],
      hi: ['गोदावरी बेसिन सिंचाई परियोजनाओं को गति', 'ग्रामीण संपर्क मार्गों का उन्नयन', 'किसानों के लिए बिजली और जल आपूर्ति सुदृढ़ीकरण']
    }
  },
  {
    id: 'm-2024',
    year: '2024',
    category: 'election',
    title: {
      mr: '२०२४ विधानसभा निवडणूक सहभाग',
      en: 'Contested 2024 Ghansawangi Assembly Election',
      hi: '२०२४ घनसावंगी विधानसभा चुनाव सहभागिता'
    },
    role: {
      mr: 'माजी आमदार, घनसावंगी (९६,१८७ मते)',
      en: 'Former MLA, Ghansawangi (96,187 Votes)',
      hi: 'पूर्व विधायक, घनसावंगी (९६,१८७ मत)'
    },
    description: {
      mr: 'नोव्हेंबर २०२४ च्या महाराष्ट्र विधानसभा निवडणुकीत घनसावंगी मतदारसंघातून ९६,१८७ मतदारांचा भक्कम पाठिंबा मिळवला. जनतेच्या प्रश्नांसाठी आणि विकासाच्या संकल्पासाठी विरोधी बाकांवरूनही निरंतर सक्रिय भूमिका.',
      en: 'Contested the November 2024 Maharashtra Legislative Assembly election from Ghansawangi, securing 96,187 votes in a closely fought democratic mandate. Continues dedicated public engagement as Former MLA and senior statesman.',
      hi: 'नवंबर २०२४ के महाराष्ट्र विधानसभा चुनाव में घनसावंगी से ९६,१८७ मत प्राप्त किए। पूर्व विधायक और वरिष्ठ राजनेता के रूप में जनसेवा में निरंतर सक्रिय।'
    },
    highlights: {
      mr: ['९६,१८७ मतदारांचा दृढ व सखोल विश्वास', 'मतदारसंघातील जनतेशी निरंतर संपर्क व गावभेट सत्रे'],
      en: ['Secured 96,187 votes representing deep grassroots connect', 'Active continuing public outreach across villages and talukas'],
      hi: ['९६,१८७ मतदाताओं का अटूट विश्वास', 'जनता के साथ निरंतर संवाद और ग्राम संपर्क अभियान']
    }
  }
];

export const portfolios: Portfolio[] = [
  {
    id: 'p-health',
    tenure: '2019 – 2022',
    iconName: 'Activity',
    department: {
      mr: 'सार्वजनिक आरोग्य व कुटुंब कल्याण',
      en: 'Public Health & Family Welfare',
      hi: 'सार्वजनिक स्वास्थ्य एवं परिवार कल्याण'
    },
    designation: {
      mr: 'कॅबिनेट मंत्री, महाराष्ट्र शासन',
      en: 'Cabinet Minister, Govt. of Maharashtra',
      hi: 'कैबिनेट मंत्री, महाराष्ट्र शासन'
    },
    description: {
      mr: 'कोविड-१९ च्या जागतिक संकटात राज्यातील आरोग्य संरचनेचे आधुनिकीकरण, दररोज पारदर्शक संवाद, ऑक्सिजन स्वयंपूर्णता आणि मोफत आरोग्य विमा योजनांचे यशस्वी संचालन.',
      en: 'Comprehensive stewardship during the COVID-19 pandemic, augmenting ICU and oxygen infrastructure across all 36 districts, leading testing campaigns and statewide vaccination.',
      hi: 'कोविड-१९ के दौरान सभी जिलों में स्वास्थ्य ढांचे का आधुनिकीकरण, पारदर्शी प्रेस वार्ताएं और निशुल्क स्वास्थ्य योजनाओं का प्रभावी क्रियान्वयन।'
    },
    keyInitiatives: {
      mr: [
        'ऑक्सिजन निर्मिती व साठवणुकीत स्वयंपूर्णतेसाठी ‘मिशन ऑक्सिजन’',
        '‘माझे कुटुंब, माझी जबाबदारी’ मोहिमेअंतर्गत राज्यातील कोट्यवधी कुटुंबांचे आरोग्य सर्वेक्षण',
        'महात्मा ज्योतिराव फुले जन आरोग्य योजना (MJPJAY) सर्वसामान्य जनतेसाठी खुली',
        'ग्रामीण व उपजिल्हा रुग्णालयांमध्ये सीटी स्कॅन आणि अत्याधुनिक प्रयोगशाळा'
      ],
      en: [
        '"Mission Oxygen" achieving medical oxygen self-sufficiency',
        'Statewide "My Family, My Responsibility" health screening survey',
        'Universalization of Mahatma Jyotirao Phule Jan Arogya Yojana health insurance',
        'Setting up modern CT scans and labs in sub-district hospitals'
      ],
      hi: [
        'मेडिकल ऑक्सीजन आत्मनिर्भरता हेतु "मिशन ऑक्सीजन"',
        '"मेरा परिवार, मेरी जिम्मेदारी" व्यापक स्वास्थ्य सर्वेक्षण',
        'महात्मा ज्योतिराव फुले जन आरोग्य योजना का सार्वभौमिक विस्तार',
        'उपजिला एवं ग्रामीण अस्पतालों में आधुनिक चिकित्सा सुविधाएं'
      ]
    }
  },
  {
    id: 'p-higher-edu',
    tenure: '2008 – 2014',
    iconName: 'GraduationCap',
    department: {
      mr: 'उच्च व तंत्रशिक्षण',
      en: 'Higher & Technical Education',
      hi: 'उच्च एवं तकनीकी शिक्षा'
    },
    designation: {
      mr: 'कॅबिनेट मंत्री, महाराष्ट्र शासन',
      en: 'Cabinet Minister, Govt. of Maharashtra',
      hi: 'कैबिनेट मंत्री, महाराष्ट्र शासन'
    },
    description: {
      mr: 'महाराष्ट्रातील विद्यापीठे आणि तंत्रनिकेतन महाविद्यालयांचा दर्जा उंचावण्यासाठी आधुनिक अभ्यासक्रम, डिजिटलायझेशन आणि ग्रामीण भागातील विद्यार्थ्यांना शिक्षणाच्या संधी उपलब्ध करून दिल्या.',
      en: 'Transformative reforms in higher education, upgrading technical polytechnics, digitizing examination systems, and sanctioning autonomous colleges across Maharashtra.',
      hi: 'उच्च और तकनीकी शिक्षा में नवाचार, पॉलिटेक्निक संस्थानों का सुदृढ़ीकरण, परीक्षा प्रणाली का आधुनिकीकरण और छात्रवृत्तियों का विस्तार।'
    },
    keyInitiatives: {
      mr: [
        'राज्यभरात शासकीय व अनुदानित तंत्रनिकेतन (पॉलिटेक्निक) महाविद्यालयांची मंजुरी',
        'विद्यापीठ परीक्षांचे संगणकीकरण आणि निकालांमधील पारदर्शकता',
        'आरक्षित व आर्थिक दुर्बल घटकांसाठी शिष्यवृत्ती वितरण प्रणाली अधिक सुलभ',
        'संशोधन व नवोपक्रम (Incubation) केंद्रांची स्थापना'
      ],
      en: [
        'Sanctioning new polytechnic and engineering institutions in semi-urban hubs',
        'Computerization of university evaluation and result declarations',
        'Direct and transparent scholarship disbursement for underprivileged students',
        'Fostering university research and incubation ecosystems'
      ],
      hi: [
        'अर्ध-शहरी एवं ग्रामीण क्षेत्रों में तकनीकी शिक्षण संस्थानों की स्थापना',
        'विश्वविद्यालय परीक्षा एवं मूल्यांकन प्रणाली का कम्प्यूटरीकरण',
        'वंचित वर्ग के छात्रों हेतु पारदर्शी छात्रवृत्ति प्रणाली',
        'विश्वविद्यालयों में अनुसंधान एवं नवाचार केंद्रों का निर्माण'
      ]
    }
  },
  {
    id: 'p-medical-edu',
    tenure: 'पूर्व कार्यकाळ',
    iconName: 'HeartPulse',
    department: {
      mr: 'वैद्यकीय शिक्षण',
      en: 'Medical Education',
      hi: 'चिकित्सा शिक्षा'
    },
    designation: {
      mr: 'मंत्री / राज्यमंत्री जबाबदारी',
      en: 'Ministerial Responsibilities',
      hi: 'मंत्रालयिक प्रभार'
    },
    description: {
      mr: 'शासकीय वैद्यकीय महाविद्यालयांमधील पायाभूत सुविधांची वाढ, पदव्युत्तर जागांमध्ये वाढ आणि सुपर स्पेशालिटी उपचारांचा विस्तार.',
      en: 'Augmented seats in state medical colleges, improved tertiary hospital infrastructure, and enhanced clinical facilities across medical institutions.',
      hi: 'राजकीय मेडिकल कॉलेजों में सीटों की वृद्धि, आधुनिक उपकरण और सुपर स्पेशियलिटी सेवाओं का विस्तार।'
    },
    keyInitiatives: {
      mr: [
        'वैद्यकीय महाविद्यालयांमधील विद्यार्थी वसतिगृहे व लॅबचे आधुनिकीकरण',
        'ग्रामीण भागात डॉक्टर सेवा उपलब्धतेसाठी प्रोत्साहनपर धोरणे'
      ],
      en: [
        'Upgraded hostels, laboratories and diagnostic wings in government medical colleges',
        'Incentive frameworks for doctors serving in rural and remote hospitals'
      ],
      hi: [
        'मेडिकल कॉलेज छात्रावासों एवं प्रयोगशालाओं का आधुनिकीकरण',
        'ग्रामीण क्षेत्रों में चिकित्सकों की उपलब्धता हेतु नीतिगत प्रोत्साहन'
      ]
    }
  },
  {
    id: 'p-water',
    tenure: 'पूर्व कार्यकाळ',
    iconName: 'Droplet',
    department: {
      mr: 'जलसंधारण व सिंचन',
      en: 'Water Conservation & Irrigation',
      hi: 'जल संरक्षण एवं सिंचाई'
    },
    designation: {
      mr: 'मंत्रिपद जबाबदाऱ्या',
      en: 'Ministerial Responsibilities',
      hi: 'मंत्रालयिक दायित्व'
    },
    description: {
      mr: 'मराठवाडा व दुष्काळग्रस्त भागासाठी पाणलोट क्षेत्र विकास, सिमेंट बंधारे आणि उपसा सिंचन प्रकल्पांना शासकीय मंजुरी मिळवून दिली.',
      en: 'Prioritized watershed development, check dams, and lift irrigation schemes in drought-prone Marathwada regions to bolster farmer self-reliance.',
      hi: 'सूखाग्रस्त मराठवाड़ा क्षेत्र में जल संचयन, चेक डैम और लिफ्ट सिंचाई परियोजनाओं को स्वीकृति दिलाई।'
    },
    keyInitiatives: {
      mr: [
        'शेतकऱ्यांच्या शेतापर्यंत पाणी पोहोचवण्यासाठी सूक्ष्म सिंचन व बंधारे',
        'गोदावरी खोऱ्यातील पूरक सिंचन प्रकल्पांचा पाठपुरावा'
      ],
      en: [
        'Check dams and micro-watershed structures safeguarding agrarian yields',
        'Expedited approvals for Godavari tributary lift irrigation projects'
      ],
      hi: [
        'खेतों तक सिंचाई जल पहुंचाने हेतु चेक डैम एवं जल संचयन संरचनाएं',
        'गोदावरी घाटी में पूरक सिंचाई योजनाओं का विस्तार'
      ]
    }
  },
  {
    id: 'p-energy',
    tenure: 'पूर्व कार्यकाळ',
    iconName: 'Zap',
    department: {
      mr: 'ऊर्जा व वीज पायाभूत सुविधा',
      en: 'Energy & Power Infrastructure',
      hi: 'ऊर्जा एवं विद्युत ढांचा'
    },
    designation: {
      mr: 'मंत्रिपद जबाबदाऱ्या',
      en: 'Ministerial Responsibilities',
      hi: 'मंत्रालयिक दायित्व'
    },
    description: {
      mr: 'ग्रामीण भागातील कृषी पंपांना अखंडित वीजपुरवठा, उपकेंद्रांची निर्मिती आणि शेतीसाठी सौर ऊर्जेचा वापर वाढवण्यासाठी पुढाकार.',
      en: 'Focused on dedicated agricultural power feeders, setting up sub-stations to resolve voltage drops, and advancing solar pumps.',
      hi: 'ग्रामीण कृषि फीडर सुदृढ़ीकरण, नए सब-स्टेशन की स्थापना और सिंचाई हेतु सौर ऊर्जा का विस्तार।'
    },
    keyInitiatives: {
      mr: [
        'घनसावंगी व जालना परिसरात नवीन वीज उपकेंद्रांची उभारणी',
        'शेतकऱ्यांना कृषी वीज जोडण्यांचे सुलभ वितरण'
      ],
      en: [
        'Commissioned new 33/11 kV sub-stations in rural assembly segments',
        'Facilitated agricultural power connection disbursal for agrarian pumps'
      ],
      hi: [
        'ग्रामीण क्षेत्रों में नए विद्युत सब-स्टेशनों की स्थापना',
        'कृषि पंपों हेतु विद्युत कनेक्शनों का सुगम वितरण'
      ]
    }
  },
  {
    id: 'p-environment',
    tenure: 'पूर्व कार्यकाळ',
    iconName: 'Leaf',
    department: {
      mr: 'पर्यावरण व वनीकरण',
      en: 'Environment & Forestry',
      hi: 'पर्यावरण एवं वानिकी'
    },
    designation: {
      mr: 'मंत्रिपद जबाबदाऱ्या',
      en: 'Ministerial Responsibilities',
      hi: 'मंत्रालयिक दायित्व'
    },
    description: {
      mr: 'प्रदूषण नियंत्रण मंडळाच्या नियमांचे पालन, पर्यावरणपूरक औद्योगिक धोरण आणि ग्रामीण भागात मोठ्या प्रमाणावर वृक्षलागवड मोहिमा.',
      en: 'Monitored environmental compliance for industrial zones and led community tree plantation drives to combat Marathwada aridification.',
      hi: 'पर्यावरण नियमों का अनुपालन, हरित उद्योग नीतियां और व्यापक वृक्षारोपण अभियान।'
    },
    keyInitiatives: {
      mr: [
        'नदी स्वच्छता आणि औद्योगिक सांडपाणी प्रक्रिया प्रकल्पांची तपासणी',
        'शाळा व महाविद्यालयीन विद्यार्थ्यांमध्ये पर्यावरण जागृती'
      ],
      en: [
        'Inspections of effluent treatment plants in industrial corridors',
        'Youth and student-led environmental awareness programs'
      ],
      hi: [
        'नदी स्वच्छता और औद्योगिक अपशिष्ट प्रबंधन निगरानी',
        'छात्रों में पर्यावरण संरक्षण जागरूकता'
      ]
    }
  },
  {
    id: 'p-urban',
    tenure: 'पूर्व कार्यकाळ',
    iconName: 'Building2',
    department: {
      mr: 'नगरविकास व स्थानिक स्वराज्य',
      en: 'Urban Development & Local Bodies',
      hi: 'नगर विकास एवं स्थानीय निकाय'
    },
    designation: {
      mr: 'मंत्रिपद जबाबदाऱ्या',
      en: 'Ministerial Responsibilities',
      hi: 'मंत्रालयिक दायित्व'
    },
    description: {
      mr: 'शहरी व निमशहरी भागातील रस्ते, भुयारी गटारे, घनकचरा व्यवस्थापन आणि नागरिकांना मूलभूत नागरी सुविधा पुरवण्यासाठी विकास निधीची तरतूद.',
      en: 'Channelized municipal development grants for storm drainage, modern road widening, and solid waste processing in regional town centers.',
      hi: 'शहरी व कस्बाई क्षेत्रों में जल निकासी, सड़क चौड़ीकरण और स्वच्छता बुनियादी ढांचे का विकास।'
    },
    keyInitiatives: {
      mr: [
        'नगरपंचायत व नगरपालिका भागासाठी पाणीपुरवठा योजनांचा निधी',
        'शहरांमधील मुख्य रस्त्यांचे सुशोभीकरण व पथदिवे व्यवस्था'
      ],
      en: [
        'Dedicated water distribution sanctions for newly constituted Nagar Panchayats',
        'LED street lighting and civic mobility corridors'
      ],
      hi: [
        'नगर पंचायतों हेतु पेयजल संवर्धन योजनाएं',
        'सड़क चौड़ीकरण एवं प्रकाश व्यवस्था'
      ]
    }
  }
];

// All images removed per user request: "MY WORK me se sab photo remove karo All Categories"
export const developmentProjects: DevelopmentProject[] = [
  {
    id: 'dp-1',
    category: 'water',
    village: 'घनसावंगी व लगतची गावे',
    taluka: 'घनसावंगी',
    year: '2021–2023',
    status: 'Completed',
    title: {
      mr: 'गोदावरी खोरे उपसा सिंचन व कालवा संवर्धन योजना',
      en: 'Godavari Basin Lift Irrigation & Canal Modernization',
      hi: 'गोदावरी घाटी लिफ्ट सिंचाई एवं नहर सुदृढ़ीकरण योजना'
    },
    description: {
      mr: 'गोदावरी नदीवरील पाण्याचा शेतीसाठी पुरेपूर वापर व्हावा यासाठी उपसा सिंचन योजनांचे नूतनीकरण आणि वितरिका कालव्यांची दुरुस्ती पूर्ण करण्यात आली.',
      en: 'Comprehensive overhaul of lift irrigation channels along the Godavari river, ensuring reliable canal water delivery for thousands of farm acres.',
      hi: 'गोदावरी नदी के जल का कृषि उपयोग सुनिश्चित करने हेतु लिफ्ट सिंचाई चैनलों का आधुनिकीकरण एवं नहर मरम्मत।'
    },
    impact: {
      mr: 'अनेक गावांमधील हजारो एकर शेतीला शाश्वत सिंचनाचा लाभ.',
      en: 'Thousands of agrarian acres secured with seasonal irrigation water.',
      hi: 'हजारों एकड़ कृषि भूमि को निरंतर सिंचाई सुविधा।'
    },
    officialRef: 'WRD/MHA/JALNA-IRR/2021'
  },
  {
    id: 'dp-2',
    category: 'health',
    village: 'घनसावंगी व तीर्थपुरी',
    taluka: 'घनसावंगी',
    year: '2020–2022',
    status: 'Completed',
    title: {
      mr: 'ग्रामीण रुग्णालय व प्राथमिक आरोग्य केंद्रांचे आधुनिकीकरण',
      en: 'Upgradation of Rural Hospital & Primary Health Centres',
      hi: 'ग्रामीण अस्पताल एवं प्राथमिक स्वास्थ्य केंद्रों का आधुनिकीकरण'
    },
    description: {
      mr: 'घनसावंगी येथील ग्रामीण रुग्णालयात आधुनिक ऑक्सिजन जनरेशन प्लांट, डिजिटल एक्स-रे, पॅथॉलॉजी लॅब आणि प्रसूती कक्षाची अत्याधुनिक सुविधा सुरू केली.',
      en: 'Installed in-situ PSA medical oxygen generators, digital X-ray diagnostics, expanded maternal care wards, and automated pharmacy supply chains.',
      hi: 'ऑक्सीजन जनरेशन प्लांट, डिजिटल एक्स-रे, प्रयोगशाला एवं प्रसूति वार्ड का आधुनिक विस्तार।'
    },
    impact: {
      mr: 'स्थानिक नागरिकांना उपचारासाठी मोठ्या शहरांवर अवलंबून राहण्याची गरज उरली नाही.',
      en: 'Eliminated emergency referral delays for rural residents.',
      hi: 'ग्रामीण नागरिकों को स्थानीय स्तर पर आपातकालीन एवं उच्च चिकित्सा सुविधा।'
    },
    officialRef: 'PHD/CIVIL-HOSP/GHN-08'
  },
  {
    id: 'dp-3',
    category: 'roads',
    village: 'कुंभार पिंपळगाव – अंतरवाली',
    taluka: 'घनसावंगी',
    year: '2022–2024',
    status: 'Completed',
    title: {
      mr: 'प्रमुख जिल्हा मार्ग व ग्रामीण रस्त्यांचे डांबरीकरण / काँक्रीटीकरण',
      en: 'Major District Road (MDR) & Village Connectivity Upgradation',
      hi: 'प्रमुख जिला मार्ग एवं ग्रामीण सड़क डामरीकरण'
    },
    description: {
      mr: 'गावागावांना जोडणाऱ्या प्रमुख रस्त्यांचे रुंदीकरण, पूल व मोऱ्यांचे बांधकाम करून शेतीमाल बाजारपेठेत नेणे अधिक वेगवान व सुलभ केले.',
      en: 'Widening, culvert construction, and bituminous paving connecting key agricultural market hubs to state highways.',
      hi: 'कृषि उपज मंडी संपर्क मार्गों का चौड़ीकरण, पुल निर्माण एवं डामरीकरण।'
    },
    impact: {
      mr: 'शेतकऱ्यांना शेतीमाल जालना व छत्रपती संभाजीनगर बाजारपेठेत नेणे सोपे झाले.',
      en: 'Drastically cut transit times for farm output to regional APMC mandis.',
      hi: 'किसानों के लिए कृषि उत्पाद मंडियों तक पहुंचाना सुगम हुआ।'
    },
    officialRef: 'PWD/JALNA/R-104'
  },
  {
    id: 'dp-4',
    category: 'education',
    village: 'जालना व घनसावंगी परिसर',
    taluka: 'जालना / घनसावंगी',
    year: '2019–2023',
    status: 'Completed',
    title: {
      mr: 'मत्स्योदरी शिक्षण संकुल व ग्रामीण तंत्रशिक्षण विस्तार',
      en: 'Matsyodari Technical Education Campus Expansion',
      hi: 'मत्स्योदरी तकनीकी शिक्षा परिसर विस्तार'
    },
    description: {
      mr: 'ग्रामीण भागातील तरुण-तरुणींना अभियांत्रिकी, तंत्रनिकेतन आणि संगणक शिक्षणाची दर्जेदार संधी उपलब्ध करून देणाऱ्या संकुलाचे विस्तार कार्य.',
      en: 'Expanded laboratory infrastructure, high-speed computing facilities, and skill workshops across the institutional campus.',
      hi: 'ग्रामीण युवाओं हेतु इंजीनियरिंग, कंप्यूटर शिक्षा एवं कौशल विकास कार्यशालाओं का विस्तार।'
    },
    impact: {
      mr: 'दरवर्षी हजारो ग्रामीण विद्यार्थ्यांना नाममात्र शुल्कात तांत्रिक पदवी व रोजगार.',
      en: 'Over 3,000 rural students gain technical diplomas and campus placements annually.',
      hi: 'हजारों ग्रामीण छात्रों को तकनीकी उपाधि एवं रोजगार के अवसर।'
    },
    officialRef: 'H&TE/MSS-CAMPUS/2020'
  },
  {
    id: 'dp-5',
    category: 'agriculture',
    village: 'समर्थ नगर, अंकुशनगर',
    taluka: 'अंबड / घनसावंगी सीमा',
    year: '2020–2024',
    status: 'Completed',
    title: {
      mr: 'समर्थ सहकारी साखर कारखाना इथेनॉल व वीज निर्मिती प्रकल्प',
      en: 'Cooperative Sugar Factory Ethanol & Cogeneration Unit',
      hi: 'सहकारी चीनी मिल इथेनॉल एवं सह-विद्युत उत्पादन इकाई'
    },
    description: {
      mr: 'ऊस उत्पादक शेतकऱ्यांच्या उसाला योग्य मोबदला मिळावा यासाठी कारखान्यात अत्याधुनिक इथेनॉल प्रकल्प आणि सहवीज निर्मिती प्रकल्प सुरू करण्यात आला.',
      en: 'Implemented a high-capacity green ethanol distillery and cogeneration power facility, enhancing farmer cane recovery payments.',
      hi: 'गन्ना किसानों को उचित मूल्य दिलाने हेतु आधुनिक इथेनॉल संयंत्र एवं सह-विद्युत परियोजना।'
    },
    impact: {
      mr: 'शेतकऱ्यांच्या उसाला वेळेवर बिल व उपपदार्थांमुळे कारखान्याची आर्थिक सुदृढता.',
      en: 'Robust financial resilience ensuring on-time FRP payments to sugarcane growers.',
      hi: 'गन्ना उत्पादकों को समय पर भुगतान एवं हजारों युवाओं को प्रत्यक्ष रोजगार।'
    },
    officialRef: 'COOP/SUGAR/SAMARTH-ETH/09'
  },
  {
    id: 'dp-6',
    category: 'rural',
    village: 'राणी उंचेगाव व परिसर',
    taluka: 'घनसावंगी',
    year: '2023–2024',
    status: 'Completed',
    title: {
      mr: 'जलजीवन मिशन अंतर्गत ग्रामीण नळ पाणीपुरवठा योजना',
      en: 'Jal Jeevan Tap Water Distribution Schemes',
      hi: 'जल जीवन मिशन नल-जल पेयजल योजना'
    },
    description: {
      mr: 'प्रत्येक ग्रामीण कुटुंबाला शुद्ध पिण्याचे पाणी नळाद्वारे मिळावे यासाठी जलशुद्धीकरण संयंत्र, पाण्याच्या उंच टाक्या आणि अंतर्गत पाईपलाईनचे जाळे.',
      en: 'Commissioned overhead water reservoirs, automated filtration units, and feeder distribution networks providing household tap water.',
      hi: 'प्रत्येक घर तक स्वच्छ पेयजल पहुंचाने हेतु जल शोधन संयंत्र एवं पाइपलाइन नेटवर्क।'
    },
    impact: {
      mr: 'महिलांचे पाणी भरण्याचे कष्ट दूर झाले आणि पिण्याच्या पाण्याचा प्रश्न सुटला.',
      en: 'Resolved long-standing drinking water shortages in surrounding hamlets.',
      hi: 'ग्रामीण परिवारों को घर-घर स्वच्छ पेयजल उपलब्ध।'
    },
    officialRef: 'WSSD/JJM/GHN-42'
  },
  {
    id: 'dp-7',
    category: 'facilities',
    village: 'शहागड व तीर्थपुरी',
    taluka: 'घनसावंगी',
    year: '2022–2024',
    status: 'Completed',
    title: {
      mr: 'बहुउद्देशीय समाजमंदिर, अभ्यासिका व नागरिक सभागृह',
      en: 'Multipurpose Community Halls & Public Study Libraries',
      hi: 'बहुउद्देशीय सामुदायिक भवन एवं अध्ययन कक्ष'
    },
    description: {
      mr: 'विविध समाजातील नागरिकांना सार्वजनिक कार्यक्रम, स्पर्धा परीक्षांच्या तयारीसाठी वाचनालय आणि सामाजिक बैठकांसाठी सुसज्ज इमारतींची उभारणी.',
      en: 'Constructed public community halls equipped with free study centers, competitive exam libraries, and digital access rooms.',
      hi: 'सार्वजनिक बैठकों, प्रतियोगी परीक्षा अध्ययन एवं सामाजिक कार्यक्रमों हेतु सुसज्जित भवनों का निर्माण।'
    },
    impact: {
      mr: 'युवकांना अभ्यासासाठी शांत जागा आणि ग्रामस्थांना सण-उत्सवांसाठी हक्काचे ठिकाण.',
      en: 'Provides youth dedicated competitive exam reading rooms and halls for social ceremonies.',
      hi: 'युवाओं को अध्ययन कक्ष और नागरिकों को सामाजिक आयोजनों हेतु स्थान उपलब्ध।'
    },
    officialRef: 'RDD/COMM-HALL/2022'
  },
  {
    id: 'dp-8',
    category: 'social',
    village: 'तालुका घनसावंगी',
    taluka: 'घनसावंगी',
    year: '2021–2024',
    status: 'Ongoing',
    title: {
      mr: 'दिव्यांग व ज्येष्ठ नागरिक कल्याणकारी साहित्य वाटप योजना',
      en: 'Aids & Assistive Equipment Distribution for Divyang & Senior Citizens',
      hi: 'दिव्यांग एवं वरिष्ठ नागरिक सहायता उपकरण वितरण'
    },
    description: {
      mr: 'तालुक्यातील गरजू दिव्यांग बांधवांना तीनचाकी सायकल, श्रवणयंत्रे आणि ज्येष्ठ नागरिकांना मोफत चष्मे व आरोग्य तपासणी शिबिरांचे नियमित आयोजन.',
      en: 'Regular outreach camps distributing motorized tricycles, hearing aids, wheelchairs, and conducting free ophthalmic checkups.',
      hi: 'दिव्यांगजनों हेतु उपकरण वितरण, हियरिंग एड्स एवं निःशुल्क नेत्र परीक्षण शिविर।'
    },
    impact: {
      mr: 'शेकडो दिव्यांग बांधवांना स्वावलंबी जीवन जगण्यासाठी मोठा आधार.',
      en: 'Direct assistance to hundreds of physically challenged and elderly citizens.',
      hi: 'सैकड़ों दिव्यांग नागरिकों को आत्मनिर्भर जीवन हेतु सहारा।'
    },
    officialRef: 'SJD/DIVYANG-ASSIST/2023'
  }
];

export const constituencyVillages = [
  { name: 'घनसावंगी (Ghansawangi)', type: 'Taluka HQ', pop: 'प्रमुख तालुका केंद्र' },
  { name: 'तीर्थपुरी (Tirthpuri)', type: 'Major Rural Market', pop: 'बाजारपेठ व व्यापारी केंद्र' },
  { name: 'कुंभार पिंपळगाव (Kumbhar Pimpalgaon)', type: 'Agricultural Hub', pop: 'कृषी व सिंचन केंद्र' },
  { name: 'शहागड (Shahagad)', type: 'Godavari Basin Gateway', pop: 'गोदावरी खोरे प्रवेशद्वार' },
  { name: 'राणी उंचेगाव (Rani Unchegaon)', type: 'Gram Panchayat', pop: 'आदर्श ग्राम केंद्र' },
  { name: 'गोंदी (Gondi)', type: 'Gram Panchayat', pop: 'सिंचन लाभ क्षेत्र' },
  { name: 'जांब समर्थ (Jamb Samarth)', type: 'Historical Pilgrim Site', pop: 'ऐतिहासिक व सांस्कृतिक तीर्थ' },
  { name: 'अंकुशनगर (Ankushnagar)', type: 'Cooperative Sugar Complex', pop: 'सहकारी साखर उद्योग केंद्र' }
];
