/**
 * ============================================================
 *  TODO O CONTEÚDO DO SITE FICA AQUI.
 *  t('português', 'english', 'français', 'deutsch') = texto nos 4 idiomas.
 *  Strings simples (sem t) são iguais em todos os idiomas.
 *  Itens marcados com [TODO] ainda precisam dos seus dados.
 * ============================================================
 */
import { localize, t, type L, type Lang, type Localized } from './i18n';

type Project = {
  name: string;
  meta: L;
  desc: L;
  tags: string[];
  demo: string; // '' = sem link
  repo: string;
  press: string; // link de matéria (ex.: g1)
  awards: L[];
  color: number;
  featured?: boolean;
};

const projectItems: Project[] = [
  {
    name: 'Entre Peles',
    meta: t('Jogo · Equipe de 5 pessoas · 2026', 'Game · Team of 5 · 2026', 'Jeu · Équipe de 5 personnes · 2026', 'Spiel · Team aus 5 Personen · 2026'),
    desc: t(
      'Jogo desenvolvido com Unity e Blender por uma equipe de 5 pessoas. Vencedor de Melhor Jogo e Melhor Áudio na Game Zam Zero, foi citado em mais de 5 jornais, incluindo g1 e O Povo.',
      'Game built with Unity and Blender by a team of 5. Winner of Best Game and Best Audio at Game Zam Zero, it was covered by more than 5 newspapers, including g1 and O Povo.',
      'Jeu développé avec Unity et Blender par une équipe de 5 personnes. Lauréat du Meilleur jeu et du Meilleur audio à la Game Zam Zero, il a été cité dans plus de 5 journaux, dont g1 et O Povo.',
      'Spiel, entwickelt mit Unity und Blender von einem Team aus 5 Personen. Gewinner von „Bestes Spiel“ und „Bester Sound“ bei der Game Zam Zero; in mehr als 5 Zeitungen erwähnt, darunter g1 und O Povo.',
    ),
    tags: ['Unity', 'Blender'],
    demo: 'https://entrepeles.vercel.app/',
    repo: '',
    press: 'https://g1.globo.com/ce/ceara/especial-publicitario/sebrae-ceara/inovacao-e-negocios/noticia/2026/10/09/producoes-de-experiencias-digitais-e-jogos-cearenses-sao-destaque-no-siara-tech-summit.ghtml',
    awards: [t('Melhor Jogo', 'Best Game', 'Meilleur jeu', 'Bestes Spiel'), t('Melhor Áudio', 'Best Audio', 'Meilleur audio', 'Bester Sound'), t('Citado em 5+ jornais', 'Covered by 5+ newspapers', 'Cité dans 5+ journaux', 'In 5+ Zeitungen erwähnt')],
    color: 4,
    featured: true,
  },
  {
    name: 'Reaja!',
    meta: t('Projeto Individual · Educação & Segurança', 'Solo Project · Education & Safety', 'Projet individuel · Éducation & Sécurité', 'Einzelprojekt · Bildung & Sicherheit'),
    desc: t(
      'Site de tutoriais com orientações sobre o que fazer em caso de desastres naturais, ajudando as pessoas a reagir com segurança. Desenvolvido em HTML, CSS e JavaScript.',
      'Tutorial website with guidance on what to do in case of natural disasters, helping people react safely. Built with HTML, CSS and JavaScript.',
      'Site de tutoriels expliquant quoi faire en cas de catastrophe naturelle, pour aider chacun à réagir en sécurité. Développé en HTML, CSS et JavaScript.',
      'Tutorial-Website mit Anleitungen, was bei Naturkatastrophen zu tun ist, damit Menschen sicher reagieren können. Entwickelt mit HTML, CSS und JavaScript.',
    ),
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    demo: 'https://reajaa.vercel.app/pt/',
    repo: '',
    press: '',
    awards: [],
    color: 3,
  },
  {
    name: 'Editur Turismo',
    meta: t('Projeto para cliente · Turismo', 'Client Project · Travel', 'Projet client · Tourisme', 'Kundenprojekt · Reisen'),
    desc: t(
      'Site desenvolvido para a Editur Turismo, empresa de pacotes de viagens internacionais. Feito com Python, HTML e JavaScript.',
      'Website built for Editur Turismo, an international travel package company. Made with Python, HTML and JavaScript.',
      'Site développé pour Editur Turismo, entreprise de forfaits de voyage à l’international. Réalisé avec Python, HTML et JavaScript.',
      'Website für Editur Turismo, ein Unternehmen für internationale Reisepakete. Entwickelt mit Python, HTML und JavaScript.',
    ),
    tags: ['Python', 'HTML5', 'JavaScript'],
    demo: 'https://editurturismo.vercel.app/',
    repo: 'https://github.com/isabellaanton/Editur-Turismo',
    press: '',
    awards: [],
    color: 5,
  },
  {
    name: 'ZeroDesperdicio',
    meta: t('UNIFOR · Projeto Full-Stack', 'UNIFOR · Full-Stack Project', 'UNIFOR · Projet Full-Stack', 'UNIFOR · Full-Stack-Projekt'),
    desc: t(
      'Aplicativo que conecta doadores e receptores de alimentos, combatendo o desperdício e facilitando a doação dentro da comunidade. Construído com React e Firebase.',
      'App that connects food donors and recipients, fighting waste and making donations easier within the community. Built with React and Firebase.',
      'Application qui met en relation donateurs et bénéficiaires de nourriture, pour lutter contre le gaspillage et faciliter le don au sein de la communauté. Développée avec React et Firebase.',
      'App, die Spender und Empfänger von Lebensmitteln verbindet, Verschwendung bekämpft und das Spenden in der Gemeinschaft erleichtert. Gebaut mit React und Firebase.',
    ),
    tags: ['React', 'Firebase', 'Git'],
    demo: '',
    repo: '',
    press: '',
    awards: [],
    color: 1,
  },
  {
    name: 'Unifor Hunt',
    meta: t('UNIFOR · Geolocalização & Gamificação', 'UNIFOR · Geolocation & Gamification', 'UNIFOR · Géolocalisation & Gamification', 'UNIFOR · Geolokalisierung & Gamification'),
    desc: t(
      'Projeto acadêmico que usa geolocalização e gamificação para incentivar a exploração do campus universitário.',
      'Academic project that uses geolocation and gamification to encourage exploring the university campus.',
      'Projet académique qui utilise la géolocalisation et la gamification pour encourager l’exploration du campus universitaire.',
      'Akademisches Projekt, das Geolokalisierung und Gamification nutzt, um zur Erkundung des Universitätscampus anzuregen.',
    ),
    tags: ['JavaScript', 'Geolocation API', 'Gamificação'],
    demo: 'https://unifor-hunt.vercel.app/',
    repo: '',
    press: '',
    awards: [],
    color: 2,
  },
  {
    name: 'RallyCourt.io',
    meta: t('Projeto Pessoal · Simulação & IA', 'Personal Project · Simulation & AI', 'Projet personnel · Simulation & IA', 'Persönliches Projekt · Simulation & KI'),
    desc: t(
      'Simulador de tênis interativo com inteligência artificial, desenvolvido do zero em HTML, CSS e JavaScript.',
      'Interactive tennis simulator with artificial intelligence, built from scratch in HTML, CSS and JavaScript.',
      'Simulateur de tennis interactif avec intelligence artificielle, développé de zéro en HTML, CSS et JavaScript.',
      'Interaktiver Tennis-Simulator mit künstlicher Intelligenz, von Grund auf in HTML, CSS und JavaScript entwickelt.',
    ),
    tags: ['HTML5', 'CSS3', 'JavaScript', 'IA'],
    demo: 'https://rallyio.vercel.app/',
    repo: '',
    press: '',
    awards: [],
    color: 1,
  },
  {
    name: 'GridWave',
    meta: t('Projeto Individual · Música & Web Audio API', 'Solo Project · Music & Web Audio API', 'Projet individuel · Musique & Web Audio API', 'Einzelprojekt · Musik & Web Audio API'),
    desc: t(
      'Drum machine em português do Brasil, feita com JavaScript moderno e Web Audio API. Monte padrões, ajuste o mixer e grave suas ideias sem instalar dependências.',
      'Drum machine in Brazilian Portuguese, built with modern JavaScript and the Web Audio API. Build patterns, tweak the mixer and record your ideas without installing any dependencies.',
      'Boîte à rythmes en portugais du Brésil, réalisée avec du JavaScript moderne et la Web Audio API. Crée des patterns, règle le mixeur et enregistre tes idées sans installer de dépendances.',
      'Drum Machine auf brasilianischem Portugiesisch, gebaut mit modernem JavaScript und der Web Audio API. Baue Patterns, passe den Mixer an und nimm deine Ideen auf, ohne Abhängigkeiten zu installieren.',
    ),
    tags: ['JavaScript', 'Web Audio API', 'Áudio'],
    demo: '',
    repo: 'https://github.com/isabellaanton/GridWave', // o site antigo tinha um "é" sobrando no fim do link
    press: '',
    awards: [],
    color: 5,
  },
];

export const content = {
  site: {
    name: 'Isabella Anton',
    city: 'Fortaleza, CE',
    timeZone: 'America/Fortaleza',
    timeLabel: t('Hora local', 'Local time', 'Heure locale', 'Ortszeit'),
    url: 'https://isabellaanton.dev', // [TODO] domínio final do novo site
    role: t('Desenvolvedora', 'Developer', 'Développeuse', 'Entwicklerin'),
    title: t('Isabella Anton — Desenvolvedora', 'Isabella Anton — Developer', 'Isabella Anton — Développeuse', 'Isabella Anton — Entwicklerin'),
    description: t(
      'Isabella Anton, estudante de Ciência da Computação na UNIFOR (Fortaleza): projetos, habilidades e currículo.',
      'Isabella Anton, Computer Science student at UNIFOR (Fortaleza, Brazil): projects, skills and résumé.',
      'Isabella Anton, étudiante en informatique à l’UNIFOR (Fortaleza, Brésil) : projets, compétences et CV.',
      'Isabella Anton, Informatikstudentin an der UNIFOR (Fortaleza, Brasilien): Projekte, Fähigkeiten und Lebenslauf.',
    ),
    skip: t('Pular para o conteúdo', 'Skip to content', 'Aller au contenu', 'Zum Inhalt springen'),
    navLabel: t('Navegação principal', 'Main navigation', 'Navigation principale', 'Hauptnavigation'),
    langLabel: t('Idioma', 'Language', 'Langue', 'Sprache'),
    tabAway: t('ia · até já', 'ia · see you soon', 'ia · à bientôt', 'ia · bis bald'),
  },

  // Currículo: coloque o PDF em public/ e ajuste o caminho (pode ser um arquivo por idioma).
  resume: {
    // Hoje aponta para o PDF do site antigo. Quando quiser hospedar aqui, copie o PDF para public/ e use '/Curriculo_Isabella_Anton.pdf'.
    href: t(
      'https://isabellaantondev.vercel.app/Curriculo_Isabella_Anton.pdf',
      'https://isabellaantondev.vercel.app/Curriculo_Isabella_Anton.pdf',
      'https://isabellaantondev.vercel.app/Curriculo_Isabella_Anton.pdf',
      'https://isabellaantondev.vercel.app/Curriculo_Isabella_Anton.pdf',
    ),
    filename: 'Curriculo_Isabella_Anton.pdf',
    label: t('currículo', 'résumé', 'CV', 'lebenslauf'),
    button: t('Baixar currículo', 'Download résumé', 'Télécharger le CV', 'Lebenslauf herunterladen'),
    aria: t('Baixar currículo (PDF)', 'Download résumé (PDF)', 'Télécharger le CV (PDF)', 'Lebenslauf herunterladen (PDF)'),
  },

  socials: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/isabellaanton', handle: 'github.com/isabellaanton' },
    // atenção: no código antigo o link tinha hífen (isabella-anton) e o texto não (isabellaanton). Confirme qual é o certo.
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/isabella-anton', handle: 'linkedin.com/in/isabella-anton' },
    { id: 'email', label: 'E-mail', href: 'mailto:isabellaanton3@gmail.com', handle: 'isabellaanton3@gmail.com' },
  ],

  // Seções = pílulas do hero = links da navbar
  nav: [
    { id: 'work', kicker: 'work', label: t('projetos', 'work', 'projets', 'projekte'), title: t('Projetos em destaque', 'Featured projects', 'Projets en vedette', 'Ausgewählte Projekte') },
    { id: 'skills', kicker: 'stack', label: t('habilidades', 'skills', 'compétences', 'skills'), title: t('O que eu domino', 'What I know', 'Ce que je maîtrise', 'Was ich beherrsche') },
    { id: 'about', kicker: 'bio', label: t('sobre', 'about', 'à propos', 'über mich'), title: t('Quem sou eu', 'Who I am', 'Qui suis-je', 'Wer ich bin') },
    { id: 'contact', kicker: 'hello', label: t('contato', 'contact', 'contact', 'kontakt'), title: t('Encontre-me online', 'Find me online', 'Retrouve-moi en ligne', 'Finde mich online') },
  ],

  hero: {
    tagline: t(
      'Construindo o futuro, uma linha de código por vez.',
      'Building the future, one line of code at a time.',
      'Construire l’avenir, une ligne de code à la fois.',
      'Die Zukunft bauen, Zeile für Zeile Code.',
    ),
    eyebrow: t(
      'Ciência da Computação · UNIFOR · 4º semestre · Fortaleza, CE',
      'Computer Science · UNIFOR · 4th semester · Fortaleza, CE',
      'Informatique · UNIFOR · 4e semestre · Fortaleza, CE',
      'Informatik · UNIFOR · 4. Semester · Fortaleza, CE',
    ),
    hint: t('passe o mouse (ou toque) no IA ↑', 'hover (or tap) the IA ↑', 'survole (ou touche) le IA ↑', 'fahr mit der Maus (oder tippe) auf das IA ↑'),
    // Easter egg principal (sutil): o "IA" alterna entre significados profissionais
    ia: [
      t('Isabella Anton', 'Isabella Anton', 'Isabella Anton', 'Isabella Anton'),
      t('Interfaces Acessíveis', 'Accessible Interfaces', 'Interfaces Accessibles', 'Inklusive Anwendungen'),
      t('Inovação Aplicada', 'Applied Innovation', 'Innovation Appliquée', 'Innovation, Angewandt'),
      t('Imaginação Aplicada', 'Applied Imagination', 'Imagination Appliquée', 'Imagination, Angewandt'),
      t('Impacto Social', 'Social Impact', 'Impact Social', 'Impact, Angewandt'),
      t('Inteligência Aplicada', 'Applied Intelligence', 'Intelligence Appliquée', 'Intelligenz, Angewandt'),
    ],
  },

  projects: {
    demo: t('demo', 'demo', 'démo', 'demo'),
    code: t('código', 'code', 'code', 'Code'),
    press: t('matéria no g1', 'g1 article', 'article sur g1', 'Artikel auf g1'),
    items: projectItems,
  },

  skills: {
    categories: [
      { title: t('Linguagens', 'Languages', 'Langages', 'Programmiersprachen'), tags: ['Python', 'C', 'C++', 'Java', 'HTML5', 'CSS3', 'JavaScript', 'SQL'], color: 1 },
      { title: t('Ferramentas', 'Tools', 'Outils', 'Werkzeuge'), tags: ['Git', 'GitHub', 'VS Code', 'Linux', 'MySQL', 'PostgreSQL', 'Figma', 'Jupyter'], color: 5 },
      { title: t('Fundamentos de CS', 'Computer Science fundamentals', 'Fondamentaux de l’informatique', 'Informatikgrundlagen'), tags: ['Estruturas de Dados', 'Algoritmos', 'POO', 'Banco de Dados', 'Redes', 'SO'], color: 3 },
      { title: t('Em exploração', 'Exploring', 'En exploration', 'In Erkundung'), tags: ['Machine Learning', 'Pandas', 'NumPy', 'React', 'Node.js', 'Docker'], color: 4 },
      { title: t('Metodologias', 'Methods', 'Méthodes', 'Methoden'), tags: ['Agile / Scrum', 'Kanban', 'Clean Code', 'Versionamento', 'Code Review'], color: 2 },
      { title: t('Competências', 'Skills', 'Compétences', 'Kompetenzen'), tags: ['Resolução de Problemas', 'Trabalho em Equipe', 'Comunicação', 'Aprendizado Rápido', 'Inglês Técnico', 'Pensamento Crítico'], color: 1 },
    ],
  },

  about: {
    bio: [
      t(
        'Olá! Sou Isabella Anton, estudante do 4º semestre de Ciência da Computação na UNIFOR — Universidade de Fortaleza. Sou brasileira-francesa-britânica e nasci na Inglaterra, por isso tenho inglês fluente. Apaixonada por tecnologia, acredito que o software tem o poder de transformar vidas.',
        'Hi! I’m Isabella Anton, a 4th-semester Computer Science student at UNIFOR — Universidade de Fortaleza. I’m Brazilian-French-British and was born in England, so my English is fluent. Passionate about technology, I believe software has the power to change lives.',
        'Salut ! Je suis Isabella Anton, étudiante en 4e semestre d’informatique à l’UNIFOR — Universidade de Fortaleza. Je suis brésilienne-française-britannique et je suis née en Angleterre, j’ai donc un anglais courant. Passionnée de technologie, je crois que le logiciel a le pouvoir de transformer des vies.',
        'Hallo! Ich bin Isabella Anton, Informatikstudentin im 4. Semester an der UNIFOR — Universidade de Fortaleza. Ich bin brasilianisch-französisch-britisch und wurde in England geboren, daher spreche ich fließend Englisch. Begeistert von Technologie, glaube ich, dass Software die Kraft hat, Leben zu verändern.',
      ),
      t(
        'Ao longo da graduação, desenvolvi uma base sólida em lógica de programação, estruturas de dados, algoritmos e banco de dados. Já criei mais de 10 projetos individuais, explorando ideias e tecnologias diferentes.',
        'Throughout my degree, I’ve built a solid foundation in programming logic, data structures, algorithms and databases. I’ve already created more than 10 solo projects, exploring different ideas and technologies.',
        'Au fil de ma licence, j’ai acquis une base solide en logique de programmation, structures de données, algorithmes et bases de données. J’ai déjà créé plus de 10 projets individuels, en explorant des idées et technologies variées.',
        'Im Laufe des Studiums habe ich eine solide Grundlage in Programmierlogik, Datenstrukturen, Algorithmen und Datenbanken aufgebaut. Ich habe bereits mehr als 10 Einzelprojekte umgesetzt und dabei verschiedene Ideen und Technologien erkundet.',
      ),
      t(
        'Meus interesses giram em torno de desenvolvimento web, inteligência artificial, ciência de dados e engenharia de software.',
        'My interests revolve around web development, artificial intelligence, data science and software engineering.',
        'Mes centres d’intérêt tournent autour du développement web, de l’intelligence artificielle, de la science des données et du génie logiciel.',
        'Meine Interessen drehen sich um Webentwicklung, künstliche Intelligenz, Data Science und Software Engineering.',
      ),
    ],
    stats: [
      { value: t('4º', '4th', '4e', '4.'), label: t('Semestre · Ciência da Computação / UNIFOR', 'Semester · Computer Science / UNIFOR', 'Semestre · Informatique / UNIFOR', 'Semester · Informatik / UNIFOR'), color: 1 },
      { value: '10+', label: t('Projetos individuais', 'Solo projects', 'Projets individuels', 'Einzelprojekte'), color: 4 },
      { value: 'EN', label: t('Inglês fluente · nascida na Inglaterra', 'Fluent English · born in England', 'Anglais courant · née en Angleterre', 'Fließend Englisch · in England geboren'), color: 5 },
      { value: '2', label: t('Artigos publicados · Extensão UNIFOR', 'Published articles · UNIFOR Extension', 'Articles publiés · Extension UNIFOR', 'Veröffentlichte Artikel · UNIFOR-Extension'), color: 2 },
    ],
    educationTitle: t('Formação', 'Education', 'Formation', 'Ausbildung'),
    education: [
      {
        role: t('Ciência da Computação', 'Computer Science', 'Informatique', 'Informatik'),
        company: 'UNIFOR — Universidade de Fortaleza',
        period: t('4º semestre · Fortaleza, CE', '4th semester · Fortaleza, CE', '4e semestre · Fortaleza, CE', '4. Semester · Fortaleza, CE'),
        desc: t(
          'Base sólida em lógica de programação, estruturas de dados, algoritmos e banco de dados.',
          'Solid foundation in programming logic, data structures, algorithms and databases.',
          'Base solide en logique de programmation, structures de données, algorithmes et bases de données.',
          'Solide Grundlage in Programmierlogik, Datenstrukturen, Algorithmen und Datenbanken.',
        ),
        color: 1,
      },
    ],
    publicationsTitle: t('Publicações', 'Publications', 'Publications', 'Veröffentlichungen'),
    publicationsNote: t(
      'Colaboradora em 2 artigos publicados em Extensão UNIFOR.',
      'Collaborator on 2 articles published in UNIFOR Extension.',
      'Collaboratrice sur 2 articles publiés dans Extension UNIFOR.',
      'Mitautorin von 2 Artikeln, veröffentlicht in UNIFOR Extensão.',
    ),
    // Títulos dos artigos mantidos no original. [TODO] confirme revista/anais e ano, e adicione o link se houver.
    publications: [
      { title: 'Flora do Campus: A Tecnologia como Ponte para a Educação Ambiental e Pertencimento Ecológico', venue: 'Extensão UNIFOR', year: '', href: '', color: 2 },
      { title: 'Unifor Hunt: geolocalização e gamificação como estratégias de exploração do campus universitário', venue: 'Extensão UNIFOR', year: '', href: '', color: 4 },
    ],
  },

  contact: {
    text: t(
      'Acompanhe meus projetos e entre em contato pelas minhas redes sociais.',
      'Follow my projects and get in touch through my social networks.',
      'Suis mes projets et contacte-moi via mes réseaux sociaux.',
      'Verfolge meine Projekte und nimm über meine Social-Media-Kanäle Kontakt auf.',
    ),
  },

  dock: {
    label: t('Personalizar o site', 'Customize the site', 'Personnaliser le site', 'Website anpassen'),
    palette: t('paleta', 'palette', 'palette', 'Palette'),
    font: t('fonte', 'font', 'police', 'Schrift'),
    space: t('espaçamento', 'spacing', 'espacement', 'Abstand'),
    radius: t('raio das bordas', 'corner radius', 'rayon des bords', 'Eckenradius'),
    glow: t('brilho', 'glow', 'lueur', 'Leuchten'),
    debug: t('modo debug (tecla D)', 'debug mode (D key)', 'mode debug (touche D)', 'Debug-Modus (Taste D)'),
  },

  footer: {
    made: t('Projetado e desenvolvido por Isabella Anton', 'Designed and developed by Isabella Anton', 'Conçu et développé par Isabella Anton', 'Entworfen und entwickelt von Isabella Anton'),

  },

  notFound: {
    title: t('Página não encontrada', 'Page not found', 'Page introuvable', 'Seite nicht gefunden'),
    text: t(
      'O endereço não existe ou foi movido. Volte ao início.',
      'The address does not exist or has been moved. Head back home.',
      'Cette adresse n’existe pas ou a été déplacée. Retourne à l’accueil.',
      'Diese Adresse existiert nicht oder wurde verschoben. Zurück zur Startseite.',
    ),
  },
};

export type Dict = Localized<typeof content>;
export const getDict = (lang: Lang): Dict => localize(content, lang);
