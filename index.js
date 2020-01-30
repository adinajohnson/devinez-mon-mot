/* global
Vue,
getTimezonelessLocalDate,
UNKNOWN_LEADERBOARD_ERROR,
makeLeaderboardRequest,
getFormattedTime,
validWordTrie
*/


/* eslint-disable */
const possibleWords = {
    // mots normaux basés sur cette liste de fréquence lexicale https://eduscol.education.fr/pid23250-cid50486/vocabulaire.html
    normal: /* DON'T LOOK CLOSELY UNLESS YOU WANT TO BE SPOILED!!! */['air', 'âme', 'ami', 'art', 'bas', 'bon', 'but', 'car', 'cas', 'cou', 'dix', 'dos', 'dur', 'eau', 'etc', 'été', 'fer', 'feu', 'fil', 'fin', 'foi', 'fou', 'ici', 'île', 'jeu', 'mal', 'mot', 'mur', 'nez', 'nom', 'nul', 'oui', 'pas', 'pur', 'roi', 'rue', 'sac', 'sec', 'six', 'soi', 'sol', 'son', 'sou', 'tel', 'toi', 'ton', 'tôt', 'vif', 'vin', 'vol', 'vue', 'abri', 'acte', 'agir', 'aide', 'aile', 'arme', 'avec', 'avis', 'banc', 'beau', 'bête', 'bien', 'bleu', 'bois', 'bord', 'bout', 'bras', 'ceci', 'chat', 'chef', 'cher', 'ciel', 'cinq', 'clef', 'coin', 'côte', 'côté', 'coup', 'cour', 'dame', 'déjà', 'delà', 'demi', 'dent', 'dieu', 'doux', 'eaux', 'égal', 'état', 'face', 'faim', 'fait', 'faux', 'fête', 'fier', 'fils', 'fine', 'fixe', 'flot', 'fond', 'fort', 'fuir', 'gens', 'goût', 'gris', 'gros', 'haïr', 'haut', 'hier', 'hors', 'huit', 'idée', 'joli', 'joue', 'juge', 'leur', 'lien', 'lier', 'lieu', 'loin', 'long', 'lors', 'loup', 'lune', 'mari', 'même', 'midi', 'mien', 'mine', 'mode', 'mois', 'mort', 'muet', 'neuf', 'noir', 'nord', 'note', 'nuit', 'oeil', 'oser', 'page', 'pain', 'paix', 'papa', 'part', 'pays', 'peau', 'père', 'peur', 'pied', 'plan', 'pont', 'port', 'près', 'prêt', 'prix', 'puis', 'quel', 'quoi', 'race', 'rang', 'rare', 'réel', 'rêve', 'rire', 'robe', 'rôle', 'rond', 'rose', 'sang', 'sein', 'sien', 'soin', 'soir', 'soit', 'tant', 'tête', 'toit', 'tour', 'tout', 'très', 'trop', 'trou', 'tuer', 'type', 'user', 'vent', 'vers', 'vert', 'vide', 'vite', 'voie', 'voix', 'vrai', 'agent', 'aider', 'ainsi', 'amour', 'année', 'appel', 'après', 'arbre', 'armée', 'armer', 'assez', 'aucun', 'avant', 'bande', 'barbe', 'beaux', 'blanc', 'blond', 'boire', 'bruit', 'calme', 'carte', 'cause', 'céder', 'cesse', 'chair', 'champ', 'chant', 'chaud', 'chien', 'choix', 'chute', 'clair', 'coeur', 'colon', 'comme', 'corde', 'corps', 'cours', 'court', 'créer', 'crier', 'crise', 'croix', 'cruel', 'début', 'désir', 'digne', 'doigt', 'doute', 'douze', 'drame', 'droit', 'drôle', 'durer', 'éclat', 'école', 'effet', 'enfin', 'envie', 'épais', 'étage', 'étude', 'façon', 'faute', 'ferme', 'fille', 'finir', 'fixer', 'fleur', 'folie', 'force', 'forêt', 'forme', 'foule', 'frais', 'franc', 'frère', 'froid', 'front', 'fruit', 'fumée', 'fumer', 'fusil', 'garde', 'genou', 'genre', 'geste', 'glace', 'grâce', 'grain', 'grand', 'grave', 'guère', 'haine', 'haute', 'herbe', 'hiver', 'honte', 'hôtel', 'image', 'jambe', 'jaune', 'jeter', 'jeune', 'jouer', 'juger', 'juste', 'large', 'larme', 'léger', 'lever', 'lèvre', 'libre', 'ligne', 'livre', 'lourd', 'lueur', 'lutte', 'masse', 'matin', 'mêler', 'mener', 'mieux', 'mille', 'mince', 'miser', 'moins', 'moyen', 'noire', 'nuage', 'obéir', 'objet', 'odeur', 'ombre', 'oncle', 'ordre', 'parmi', 'parti', 'passé', 'payer', 'peine', 'perdu', 'perte', 'peser', 'pièce', 'pitié', 'place', 'plein', 'pluie', 'poche', 'poète', 'poids', 'point', 'porte', 'poser', 'poste', 'prier', 'quart', 'queue', 'rayon', 'règle', 'repas', 'reste', 'rêver', 'riche', 'roche', 'roman', 'rouge', 'route', 'ruine', 'sable', 'saint', 'salle', 'salut', 'santé', 'scène', 'seuil', 'siège', 'signe', 'somme', 'sorte', 'sourd', 'subir', 'sueur', 'suite', 'sujet', 'table', 'tache', 'tâche', 'taire', 'tapis', 'tenir', 'terme', 'terre', 'tirer', 'titre', 'toile', 'tombe', 'toute', 'trace', 'train', 'trait', 'trois', 'usage', 'vague', 'vaste', 'verre', 'vêtir', 'vieil', 'vieux', 'ville', 'vingt', 'vivre', 'voilà', 'voile', 'voler', 'absolu', 'accent', 'accord', 'action', 'agiter', 'amener', 'amuser', 'animal', 'animer', 'argent', 'aspect', 'auprès', 'auquel', 'autant', 'auteur', 'autour', 'avance', 'avenir', 'avouer', 'battre', 'beauté', 'besoin', 'billet', 'briser', 'brûler', 'bureau', 'cacher', 'calmer', 'casser', 'causer', 'centre', 'cercle', 'certes', 'cesser', 'chacun', 'chaîne', 'chaise', 'chance', 'chaque', 'charge', 'chasse', 'chemin', 'cheveu', 'claire', 'classe', 'colère', 'combat', 'commun', 'compte', 'contre', 'couche', 'couler', 'couper', 'courir', 'course', 'coûter', 'danger', 'danser', 'debout', 'défaut', 'dehors', 'demain', 'départ', 'depuis', 'désert', 'dessus', 'détail', 'devant', 'devoir', 'divers', 'dormir', 'double', 'douter', 'droite', 'durant', 'écrire', 'effort', 'élever', 'empire', 'ennemi', 'énorme', 'entier', 'entrée', 'entrer', 'épaule', 'époque', 'erreur', 'espace', 'espoir', 'esprit', 'étaler', 'étoile', 'étroit', 'éviter', 'exiger', 'facile', 'faible', 'faveur', 'fermer', 'fidèle', 'figure', 'flamme', 'fonder', 'forcer', 'former', 'gagner', 'garçon', 'garder', 'gauche', 'gloire', 'goutte', 'groupe', 'guerre', 'hasard', 'humide', 'jardin', 'jusque', 'lequel', 'lettre', 'lisser', 'livrer', 'lutter', 'madame', 'maison', 'maître', 'malade', 'malgré', 'manger', 'manier', 'marche', 'marché', 'marier', 'membre', 'mentir', 'mesure', 'métier', 'milieu', 'minute', 'moitié', 'moment', 'monter', 'mourir', 'naître', 'nation', 'nombre', 'nommer', 'oeuvre', 'offrir', 'oiseau', 'ouvert', 'ouvrir', 'palais', 'papier', 'paquet', 'pareil', 'parent', 'parole', 'partie', 'partir', 'patron', 'pauvre', 'paysan', 'pendre', 'pensée', 'penser', 'perdre', 'peuple', 'phrase', 'pierre', 'placer', 'plaine', 'plaire', 'plante', 'plutôt', 'poésie', 'pointe', 'police', 'porter', 'précis', 'prêter', 'preuve', 'prière', 'prince', 'prison', 'projet', 'propos', 'public', 'quatre', 'quinze', 'raison', 'rapide', 'regard', 'rendre', 'rester', 'retour', 'réunir', 'revoir', 'rideau', 'rocher', 'rompre', 'rouler', 'saisir', 'saison', 'saluer', 'sauter', 'sauver', 'savoir', 'second', 'secret', 'sentir', 'serrer', 'servir', 'siècle', 'signer', 'simple', 'social', 'soirée', 'soldat', 'soleil', 'sommet', 'songer', 'sonner', 'sortir', 'source', 'succès', 'suivre', 'taille', 'tantôt', 'témoin', 'tendre', 'tenter', 'tomber', 'tracer', 'trente', 'trésor', 'triste', 'unique', 'valeur', 'valoir', 'veille', 'vendre', 'ventre', 'vérité', 'verser', 'visage', 'vision', 'visite', 'vivant', 'voisin', 'voyage', 'abattre', 'absence', 'accuser', 'acheter', 'achever', 'affaire', 'ajouter', 'allumer', 'anglais', 'appeler', 'appuyer', 'arrêter', 'arrière', 'arrivée', 'arriver', 'article', 'asseoir', 'assurer', 'attirer', 'avancer', 'baisser', 'bientôt', 'bonheur', 'branche', 'briller', 'cabinet', 'capable', 'certain', 'cerveau', 'chaleur', 'chambre', 'chanter', 'charger', 'chasser', 'chemise', 'chiffre', 'choisir', 'colline', 'combien', 'comment', 'complet', 'confier', 'conseil', 'content', 'coucher', 'couleur', 'courage', 'courant', 'couvrir', 'crainte', 'creuser', 'croiser', 'cuisine', 'curieux', 'décider', 'décrire', 'dégager', 'demande', 'déposer', 'dernier', 'désirer', 'devenir', 'deviner', 'diriger', 'docteur', 'dominer', 'douceur', 'douleur', 'dresser', 'écarter', 'éclater', 'écouter', 'écraser', 'effacer', 'élément', 'emmener', 'émotion', 'endroit', 'énergie', 'enfance', 'engager', 'enlever', 'ensuite', 'environ', 'envoyer', 'espérer', 'essuyer', 'établir', 'étendre', 'étendue', 'éternel', 'étonner', 'étrange', 'étudier', 'exemple', 'exister', 'exposer', 'famille', 'fatigue', 'fenêtre', 'feuille', 'figurer', 'fortune', 'général', 'glisser', 'grandir', 'habiter', 'hauteur', 'hésiter', 'heureux', 'honneur', 'horizon', 'ignorer', 'immense', 'imposer', 'inconnu', 'instant', 'intérêt', 'inutile', 'inviter', 'joindre', 'journal', 'journée', 'justice', 'liberté', 'lorsque', 'lumière', 'machine', 'maladie', 'malheur', 'manquer', 'marcher', 'mariage', 'marquer', 'matière', 'mauvais', 'médecin', 'mémoire', 'menacer', 'mériter', 'million', 'moindre', 'montrer', 'morceau', 'musique', 'naturel', 'nerveux', 'nourrir', 'nouveau', 'obliger', 'oreille', 'oublier', 'ouvrage', 'parfois', 'partout', 'passage', 'passion', 'paysage', 'pencher', 'pendant', 'plaisir', 'planche', 'pleurer', 'plonger', 'portier', 'pousser', 'premier', 'présent', 'presque', 'presser', 'prévoir', 'profond', 'prouver', 'qualité', 'quelque', 'quitter', 'ramener', 'rapport', 'réalité', 'reculer', 'réduire', 'refuser', 'rejeter', 'relever', 'remplir', 'répéter', 'réponse', 'reposer', 'respect', 'retenir', 'retirer', 'réussir', 'révéler', 'revenir', 'risquer', 'sauvage', 'science', 'seconde', 'secours', 'semaine', 'sembler', 'sentier', 'séparer', 'sérieux', 'service', 'silence', 'société', 'sommeil', 'soudain', 'sourire', 'souvent', 'suffire', 'suivant', 'surtout', 'système', 'tempête', 'terrain', 'terreur', 'théâtre', 'toucher', 'tourner', 'traîner', 'traiter', 'travail', 'travers', 'tromper', 'vaincre', 'veiller', 'victime', 'village', 'violent', 'visible', 'volonté', 'voyager', 'accepter', 'accorder', 'admettre', 'adresser', 'affirmer', 'ailleurs', 'angoisse', 'annoncer', 'apporter', 'arracher', 'assister', 'attacher', 'attaquer', 'attendre', 'attitude', 'aussitôt', 'autorité', 'aventure', 'bataille', 'beaucoup', 'camarade', 'campagne', 'caresser', 'chercher', 'composer', 'conclure', 'conduire', 'contenir', 'convenir', 'craindre', 'déchirer', 'déclarer', 'défendre', 'demander', 'demeurer', 'dépasser', 'derrière', 'désigner', 'dessiner', 'détacher', 'détruire', 'dimanche', 'discours', 'discuter', 'disposer', 'distance', 'échapper', 'éclairer', 'éloigner', 'empêcher', 'employer', 'emporter', 'endormir', 'enfermer', 'enfoncer', 'ensemble', 'entendre', 'entourer', 'éprouver', 'escalier', 'éteindre', 'étouffer', 'étranger', 'examiner', 'exécuter', 'exprimer', 'fatiguer', 'fauteuil', 'fonction', 'français', 'franchir', 'françois', 'habiller', 'habitant', 'habitude', 'histoire', 'imaginer', 'immobile', 'importer', 'indiquer', 'inspirer', 'instinct', 'inventer', 'jeunesse', 'marchand', 'meilleur', 'mensonge', 'monsieur', 'montagne', 'nombreux', 'observer', 'occasion', 'officier', 'paraître', 'partager', 'parvenir', 'paupière', 'pénétrer', 'personne', 'plaindre', 'poitrine', 'position', 'posséder', 'possible', 'pourquoi', 'précéder', 'précieux', 'préférer', 'préparer', 'présence', 'prévenir', 'principe', 'problème', 'prochain', 'produire', 'profiter', 'promener', 'proposer', 'protéger', 'puissant', 'quarante', 'quartier', 'question', 'raconter', 'ramasser', 'rassurer', 'recevoir', 'réclamer', 'relation', 'religion', 'remettre', 'remonter', 'renoncer', 'répandre', 'répondre', 'réserver', 'résister', 'résoudre', 'respirer', 'résultat', 'retomber', 'seigneur', 'solitude', 'souffler', 'souffrir', 'soulever', 'soutenir', 'souvenir', 'supposer', 'terminer', 'terrible', 'trembler', 'troubler', 'vêtement', 'violence', 'vraiment', 'accomplir', 'accrocher', 'apparence', 'apprendre', 'approcher', 'atteindre', 'attention', 'autrefois', 'autrement', 'caractère', 'cependant', 'cinquante', 'commander', 'commencer', 'compagnie', 'compagnon', 'condamner', 'condition', 'confiance', 'confondre', 'connaître', 'consentir', 'consulter', 'contenter', 'continuer', 'contraire', 'curiosité', 'dangereux', 'davantage', 'découvrir', 'descendre', 'désespoir', 'désormais', 'différent', 'difficile', 'direction', 'doucement', 'également', 'embrasser', 'entraîner', 'événement', 'existence', 'important', 'inquiéter', 'installer', 'intention', 'intérieur', 'lendemain', 'lentement', 'longtemps', 'maintenir', 'militaire', 'mouvement', 'naissance', 'parcourir', 'permettre', 'plusieurs', 'politique', 'poussière', 'présenter', 'prétendre', 'printemps', 'promettre', 'prononcer', 'puissance', 'rapporter', 'recherche', 'réfléchir', 'réflexion', 'regretter', 'rejoindre', 'remarquer', 'remercier', 'remplacer', 'rencontre', 'renverser', 'repousser', 'reprendre', 'respecter', 'retourner', 'retrouver', 'réveiller', 'semblable', 'sentiment', 'seulement', 'signifier', 'situation', 'souhaiter', 'soumettre', 'spectacle', 'supérieur', 'supporter', 'tellement', 'traverser', 'troisième', 'véritable', 'vieillard', 'abandonner', 'absolument', 'apercevoir', 'apparaître', 'appartenir', 'changement', 'comprendre', 'conscience', 'considérer', 'construire', 'discussion', 'distinguer', 'entretenir', 'envelopper', 'expérience', 'expression', 'importance', 'impossible', 'impression', 'inquiétude', 'intéresser', 'interroger', 'magnifique', 'maintenant', 'nécessaire', 'personnage', 'poursuivre', 'précipiter', 'professeur', 'rapidement', 'recueillir', 'rencontrer', 'résistance', 'ressembler', 'révolution', 'satisfaire', 'secrétaire', 'silencieux', 'simplement', 'souffrance', 'surprendre', 'surveiller', 'tranquille', 'accompagner', 'appartement', 'brusquement', 'disparaître', 'interrompre', 'particulier', 'recommencer', 'reconnaître', 'représenter', 'transformer', 'certainement', 'circonstance', 'commencement', 'complètement', 'connaissance', 'conversation', 'gouvernement', 'intelligence', 'parfaitement', 'profondément', 'naturellement', 'extraordinaire',],

    // mots difficile depuis cette page Les mots difficiles du français http://olivier.jeulin.free.fr/lettres/francais/mot_dif/index.php#
    hard: /* DON'T LOOK CLOSELY UNLESS YOU WANT TO BE SPOILED!!! */
    ['abhorrer', 'abject', 'absoudre', 'acquiescer', 'admonester', 'aduler', 'allégorie', 'ambigu', 'aménité', 'amnésie', 'anagramme', 'analogue', 'antinomie', 'antithèse', 'apogée', 'apothéose', 'arbitraire', 'archaïsme', 'ascète', 'asservir', 'austère', 'austral', 'balbutier', 'besogneux', 'biographie', 'blafard', 'bougon', 'cacophonie', 'calomnie', 'carcéral', 'cataclysme', 'célérité', 'chimère', 'circonlocution', 'circonscrire', 'colloque', 'commensal', 'concéder', 'concision', 'conjuration', 'contemporain', 'convoitise', 'cosmopolite', 'couardise', 'courroux', 'débile', 'décent', 'déconvenue', 'décrépit', 'dédain', 'déférence', 'délateur', 'despotique', 'désuet', 'dextérité', 'diatribe', 'digression', 'dilapider', 'dilemme', 'disconvenir', 'discorde', 'disette', 'diurne', 'divulguer', 'draconien', 'égide', 'élite', 'émoluments', 'emphase', 'encyclopédie', 'épisode', 'équinoxe', 'esclandre', 'ethnie', 'euphémisme', 'exhaustif', 'exsangue', 'fabuleux', 'facétie', 'fallacieux', 'fasciner', 'fébrile', 'flouer', 'fresque', 'furtif', 'futile', 'gageure', 'gallicisme', 'geôle', 'gouailleur', 'hallucination', 'harangue', 'hautain', 'hécatombe', 'hégémonie', 'héraldique', 'hiérarchie', 'hirsute', 'holocauste', 'humilité', 'hypnotiser', 'hypocrisie', 'hypoglycémie', 'idiome', 'impassible', 'impécunieux', 'implicite', 'imposteur', 'imprécation', 'incarner', 'incriminer', 'indemne', 'indigène', 'inertie', 'inextinguible', 'infléchir', 'ingéniosité', 'ingénu', 'inhumer', 'insatiable', 'insensé', 'insidieux', 'insulaire', 'insurrection', 'intempestif', 'intrigue', 'intrusion', 'irascible', 'irrésolu', 'irrévérencieux', 'irrévocable', 'joug', 'jovial', 'jubiler', 'laconique', 'lambrissé', 'lauréat', 'legs', 'licite', 'ligature', 'lilliputien', 'linceul', 'litote', 'loquace', 'lyrisme', 'malthusien', 'mansuétude', 'matrimonial', 'mécène', 'médiéval', 'médisance', 'mélancolie', 'mercantilisme', 'méticuleux', 'mnémotechnie', 'moiteur', 'morbide', 'morphologie', 'mythe', 'nécropole', 'négoce', 'népotisme', 'nostalgie', 'obséquieux', 'obsolète', 'obtus', 'oisiveté', 'onéreux', 'onirique', 'onomatopée', 'opulence', 'ostentation', 'ostracisme', 'panacée', 'panégyrique', 'paradoxal', 'parité', 'parjure', 'parodier', 'paroxysme', 'pathétique', 'paupérisme', 'peccadille', 'pédant', 'pernicieux', 'pérorer', 'perplexe', 'perspicace', 'physionomie', 'pittoresque', 'plagiat', 'pléonasme', 'polémique', 'pondéré', 'posthume', 'prédilection', 'prohiber', 'prophétiser', 'prouesse', 'psalmodier', 'psychologie', 'pugnace', 'quolibet', 'rasséréner', 'rebut', 'récidive', 'réciproque', 'réitérer', 'renégat', 'réquisitoire', 'réticent', 'sarcasme', 'scrupule', 'sénile', 'servile', 'sévices', 'sobriété', 'subterfuge', 'subtilité', 'succédané', 'succinct', 'surseoir', 'susciter', 'taciturne', 'tergiverser', 'torpeur', 'transfuge', 'tribulation', 'usurper', 'utopique', 'velléitaire', 'vénal', 'veule', 'vicissitudes', 'vindicatif',]
};
/* eslint-enable */


const WIN = 'win';
const BEFORE = 'before';
const AFTER = 'after';
const HARD = 'hard';
const NORMAL = 'normal';
const OTHER_DIFFICULTY = {
    [NORMAL]: HARD,
    [HARD]: NORMAL,
};
let vueApp;

Vue.directive('focus', {
    inserted: (el) => {
        el.focus();
    },
});

document.addEventListener('DOMContentLoaded', () => {
    if (getElement('container')) {
        vueApp = new Vue({
            el: '#container',
            data: {
                guesses: [],
                difficulty: null,
                startTime: null,
                winTime: null,
                gaveUpTime: null,
                submitTime: null,
                word: undefined,
                guessValue: '',
                guessError: '',
                afterGuesses: [],
                beforeGuesses: [],
                username: '',
                usernamesUsed: [],
                isLocalStorageAvailable: null,
                isReplay: false,

                leaderboardRequest: null,
                leaderSubmitError: '',

                // Date picker state
                showDatePicker: false,
                playDate: null, // if unset playdate is for "today"
            },
            methods: {
                reset,
                setGuess,
                getInvalidReason,
                makeGuess,
                getComparisonToTargetWord,
                recordGuess,
                getFormattedTime,
                giveUp,
                setWordAndDate,
                toggleDifficulty,
                submitToLeaderboard,
                setUsername(event) {
                    this.username = event.target.value;
                },
                shouldShowSubmitName,

                // Date picker methods
                getShortDayString,
                backDay,
                backWeek,
                backMonth,
                forwardDay,
                forwardWeek,
                forwardMonth,
                toggleShowDate,
            },
        });
    }

    if (vueApp) {
        vueApp.reset({ stealFocus: true });
    }
});


function reset(options) {
    this.word = undefined;

    this.guessValue = '';

    if (typeof isLocalStorageAvailable !== 'boolean') {
        this.isLocalStorageAvailable = testLocalStorage();
    }

    resetStats(this);
    loadStoredUserNames(this);
    // reset stats

    // fix leaderboard state
    this.leaders = null;
    this.leaderSubmitError = null;
    this.leaderboardRequest = null;

    if (!options || !options.stealFocus) return;
    Vue.nextTick(() => {
        getElement('new-guess').focus();
    });
}

const LAST_SET_DIFFICULTY_KEY = 'lastSetDifficultyToday';
const RECENT_FIRST_PLAYED_DIFFICULTY = 'recentFirstPlayedDifficulty';
const SAVED_GAMES_KEYS_BY_DIFFICULTY = {
    normal: 'savedGame_normal',
    hard: 'savedGame_hard',
};
const USERNAMES_USED_KEY = 'usernamesUsed';

function resetStats(app) {
    if (!app.isLocalStorageAvailable) {
        setEmptyStats(app);
        return;
    }
    const difficulty = getDifficulty(app.difficulty);
    const savedGame = getSavedGameByDifficulty(difficulty);
    setStatsFromExistingGame(app, savedGame, difficulty);
}

function setEmptyStats(app, difficulty) {
    app.difficulty = difficulty || app.difficulty || NORMAL;
    app.guesses = [];
    app.afterGuesses = [];
    app.beforeGuesses = [];
    app.startTime = null;
    app.winTime = null;
    app.gaveUpTime = null;
    app.submitTime = null;
    app.isReplay = false;
}

function getDifficulty(currentDifficulty) {
    if (currentDifficulty) return currentDifficulty;

    const lastSetDifficulty = localStorage.getItem(LAST_SET_DIFFICULTY_KEY);
    const recentFirstPlayedDifficulty = localStorage.getItem(RECENT_FIRST_PLAYED_DIFFICULTY);
    if (!isSameDay() && recentFirstPlayedDifficulty) {
        localStorage.removeItem(RECENT_FIRST_PLAYED_DIFFICULTY);
        return recentFirstPlayedDifficulty;
    }

    return lastSetDifficulty || NORMAL;
}

function isSameDay() {
    // we determine if it's the same day by looking to see if any of the
    // saved games have the same date as today
    return Object.keys(OTHER_DIFFICULTY).some((difficulty) => {
        const savedGame = getSavedGameByDifficulty(difficulty);
        if (!savedGame) return false;
        const savedStartTime = new Date(savedGame.startTime);
        return isToday(savedStartTime);
    });
}

function isToday(date) {
    return datesMatch(now(), date);
}

function now() {
    return new Date();
}

function datesMatch(date1, date2) { // ignores time
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
}

function getSavedGameByDifficulty(difficulty) {
    const savedGameKey = SAVED_GAMES_KEYS_BY_DIFFICULTY[difficulty];
    const savedGameJSON = difficulty && localStorage.getItem(savedGameKey);
    try {
        return savedGameJSON && JSON.parse(savedGameJSON);
    } catch (e) {
        localStorage.removeItem(savedGameKey);
    }
    return undefined;
}

function setStatsFromExistingGame(app, savedGame, difficulty) {
    if (!savedGame || !savedGame.startTime) {
        setEmptyStats(app, difficulty);
        return;
    }
    const startTime = new Date(savedGame.startTime);
    if (!isPlayDateToday(app.playDate)) {
        setEmptyStats(app, difficulty);
        return;
    }
    const savedGameForToday = getDOY(startTime) === getDOY(now());
    if (!savedGameForToday) {
        resetSavedGames();
        setEmptyStats(app, difficulty);
        return;
    }
    const {
        winTime,
        gaveUpTime,
        submitTime,
        guesses,
    } = savedGame;
    app.difficulty = difficulty;
    app.startTime = startTime;
    app.winTime = (winTime && new Date(winTime)) || null;
    app.gaveUpTime = (gaveUpTime && new Date(gaveUpTime)) || null;
    app.submitTime = (submitTime && new Date(submitTime)) || null;
    app.guesses = guesses || [];
    app.word = getWord(startTime, difficulty);
    app.beforeGuesses = generateGuessList(BEFORE, guesses, app.word);
    app.afterGuesses = generateGuessList(AFTER, guesses, app.word);
    if (app.gaveUpTime || app.winTime) {
        app.word = getWord(app.startTime, app.difficulty);
        app.guessValue = app.word;
    }
    if (app.submitTime || app.gaveUpTime) {
        app.isReplay = true;
        app.guessValue = app.word;
    } else {
        app.isReplay = false;
    }
}

function isPlayDateToday(playDate) {
    if (playDate == null) return true; // by definition if playdate isn't set it is for today
    return isToday(playDate);
}

function resetSavedGames() {
    Object.keys(OTHER_DIFFICULTY).forEach((difficulty) => {
        localStorage.removeItem(SAVED_GAMES_KEYS_BY_DIFFICULTY[difficulty]);
    });
}

function generateGuessList(beforeOrAfter, guesses, word) {
    const guessList = [];
    guesses
        .filter(getBeforeOrAfterGuesses)
        .forEach((guess) => {
            insertIntoSortedArray(guessList, guess);
        });
    return guessList;

    function getBeforeOrAfterGuesses(guess) {
        if (beforeOrAfter === BEFORE) {
            return guess > word;
        }
        return guess < word;
    }
}

function testLocalStorage() {
    // stolen from https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
    const test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function loadStoredUserNames(app) {
    if (!app.isLocalStorageAvailable || app.usernamesUsed.length > 0) return;
    const usernamesJSON = localStorage.getItem(USERNAMES_USED_KEY);
    let usernames = [];
    try {
        usernames = (usernamesJSON && JSON.parse(usernamesJSON)) || [];
    } finally {
        app.usernamesUsed = usernames || [];
        const lastUsedName = app.usernamesUsed[0];
        if (lastUsedName && !app.username) {
            app.username = lastUsedName;
        }
    }
}

function setWordAndDate() {
    this.startTime = now();
    saveGame(this);

    const dateForWord = this.playDate || this.startTime;

    // Note: We don't want to set the word until the user starts playing as then
    // it'd be possible for their start date and the expected word on that date
    // not to match (and the eventual backend will verify this)
    this.word = getWord(dateForWord, this.difficulty);
}

function getWord(date, difficulty) {
    const index = getWordIndex(date);
    return possibleWords[difficulty][index];
}

function getWordIndex(date) {
    const doy = getDOY(date);
    const yearOffset = (date.getFullYear() - 2019) * 365;
    // FIXME deal with leap years?
    return doy + yearOffset - 114;
}

function saveLastSetDifficulty({ isLocalStorageAvailable, difficulty }) {
    if (!isLocalStorageAvailable) {
        return;
    }
    localStorage.setItem(LAST_SET_DIFFICULTY_KEY, difficulty);
}

function saveGame({
    isLocalStorageAvailable,
    difficulty,
    startTime,
    winTime,
    gaveUpTime,
    submitTime,
    guesses,
    playDate,
}) {
    if (!isLocalStorageAvailable || !isPlayDateToday(playDate)) {
        return;
    }
    if (!localStorage.getItem(RECENT_FIRST_PLAYED_DIFFICULTY)) {
        localStorage.setItem(RECENT_FIRST_PLAYED_DIFFICULTY, difficulty);
    }
    const savedGameKey = SAVED_GAMES_KEYS_BY_DIFFICULTY[difficulty];
    localStorage.setItem(savedGameKey, JSON.stringify({
        startTime,
        winTime,
        gaveUpTime,
        submitTime,
        guesses,
    }));
}

function setGuess(event) {
    this.guessValue = event.target.value;
    if (this.guessError) { // only re-evaluate form validity on-the-fly if it was invalid
        this.guessError = this.getInvalidReason(sanitizeGuess(this.guessValue));
    }
}

function makeGuess() {
    const guess = sanitizeGuess(this.guessValue);
    this.guessError = this.getInvalidReason(guess);

    if (this.guessError) {
        return;
    }

    this.guesses.push(guess);

    if (!this.word) {
        this.setWordAndDate();
    }

    const comparison = this.getComparisonToTargetWord(guess);
    if (comparison === WIN) {
        this.winTime = now();
        saveGame(this);
        return;
    }
    saveGame(this);
    this.guessValue = ''; // clear input to get ready for next guess

    this.recordGuess(guess, comparison);
}

function sanitizeGuess(guess) {
    return guess.toLowerCase().trim().replace(/[^a-zéèàáâôîæœ]/g, '');
}

function getInvalidReason(guess) {
    if (!guess) {
        return "Guess can't be empty.";
    }
    if (!isAValidWord(guess)) {
        return 'Guess must be an English word. (Scrabble-acceptable)';
    }
    if (this.guesses.includes(guess)) {
        return "Oops, you've already guessed that word.";
    }
    return '';
}

function isAValidWord(guess) {
    let level = validWordTrie;
    for (const letter of guess) {
        level = level[letter];
        if (!level) return false;
    }
    return '' in level;
}

function getComparisonToTargetWord(guess) {
    if (guess === this.word) {
        return WIN;
    }
    return guess > this.word ? BEFORE : AFTER;
}

function recordGuess(guess, comparison) {
    const previousGuesses = comparison === AFTER ? this.afterGuesses : this.beforeGuesses;
    insertIntoSortedArray(previousGuesses, guess);
}

function insertIntoSortedArray(array, newElement) {
    for (let i = 0; i <= array.length; i += 1) {
        const thisElement = array[i];
        if (newElement < thisElement) {
            array.splice(i, 0, newElement);
            return;
        }
    }
    array.push(newElement);
}

function giveUp() {
    if (!confirm('Really give up?')) {
        return;
    }
    this.guessValue = this.word;
    this.gaveUpTime = now();
    saveGame(this);
}

function toggleDifficulty() {
    const haveMadeGuesses = this.guesses.length > 0;
    const haveWonOrGivenUp = this.winTime || this.gaveUpTime;
    if (!this.difficulty) {
        this.difficulty = NORMAL;
        return;
    }
    if (haveMadeGuesses && !haveWonOrGivenUp && !this.isLocalStorageAvailable
        && !confirm('Change difficulty and lose current guesses?')) {
        this.$forceUpdate(); // need to make sure the changer dropdown is in the correct state
        return;
    }
    this.difficulty = OTHER_DIFFICULTY[this.difficulty] || NORMAL;
    this.reset({ stealFocus: true });
    saveLastSetDifficulty(this);
}

function shouldShowSubmitName() {
    return this.winTime && this.guesses.length > 1 && !this.isReplay && !this.submitTime
        && isPlayDateToday(this.playDate);
}

// Utilities


function getElement(id) {
    return document.getElementById(id);
}

// https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
/* eslint-disable */
function isLeapYear(date) {
    var year = date.getFullYear();
    if((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
}

// Get Day of Year
function getDOY(date) {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = date.getMonth();
    var dn = date.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if(mn > 1 && isLeapYear(date)) dayOfYear++;
    return dayOfYear;
};

/* eslint-enable */


// LEADERBOARD

function submitToLeaderboard() {
    const name = this.username;
    const postData = {
        name,
        time: this.winTime - this.startTime,
        guesses: this.guesses,
    };
    const timezonelessDate = getTimezonelessLocalDate(this.startTime);
    const submitTime = now();

    const onSuccess = () => {
        this.submitTime = submitTime;
        saveGame(this);
        saveUserName(this, name);
    };
    this.leaderSubmitError = '';
    this.leaderboardRequest = makeLeaderboardRequest(
        timezonelessDate,
        this.difficulty,
        onSuccess,
        handleBadResponse.bind(this),
        postData,
    );
}

function handleBadResponse(json, responseStatus) {
    const invalidReason = (json && json.invalidReason)
        || `${UNKNOWN_LEADERBOARD_ERROR} ${responseStatus}`;
    this.leaderSubmitError = invalidReason;
    this.leaderboardRequest = null;
    console.warn(invalidReason); // eslint-disable-line no-console
}

function saveUserName(app, name) {
    app.usernamesUsed = unshiftUniqueValue(app.usernamesUsed, name);
    localStorage.setItem(USERNAMES_USED_KEY, JSON.stringify(app.usernamesUsed));
}

function unshiftUniqueValue(arrayOfUniqueValues, newValue) {
    return [newValue].concat(
        arrayOfUniqueValues
            .filter(value => value !== newValue),
    );
}


// Date picker

function toggleShowDate() {
    const newShowDatePicker = !this.showDatePicker;
    if (newShowDatePicker === false) {
        this.playDate = null; // reset to today if they close the date picker
        this.reset();
    }
    this.showDatePicker = newShowDatePicker;
}

const SHORT_WEEK_DAY_BY_INDEX = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
];
const SHORT_MONTH_BY_INDEX = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const MILLISECONDS_IN_DAY = 60 * 60 * 24 * 1000;
const MILLISECONDS_IN_WEEK = MILLISECONDS_IN_DAY * 7;

function backDay() {
    const playDate = this.playDate || now();
    setNewPlayDate(this, playDate - MILLISECONDS_IN_DAY);
}

function forwardDay() {
    const playDate = this.playDate || now();
    setNewPlayDate(this, +playDate + MILLISECONDS_IN_DAY);
}

function backWeek() {
    const playDate = this.playDate || now();
    setNewPlayDate(this, playDate - MILLISECONDS_IN_WEEK);
}

function forwardWeek() {
    const playDate = this.playDate || now();
    setNewPlayDate(this, +playDate + MILLISECONDS_IN_WEEK);
}

function backMonth() {
    const playDate = this.playDate || now();
    const monthIndex = playDate.getMonth();
    if (monthIndex > 0) {
        playDate.setMonth(monthIndex - 1);
    } else {
        const year = playDate.getFullYear();
        playDate.setMonth(11);
        playDate.setYear(year - 1);
    }
    setNewPlayDate(this, playDate);
}

function forwardMonth() {
    const playDate = this.playDate || now();
    const monthIndex = playDate.getMonth();
    if (monthIndex < 11) {
        playDate.setMonth(monthIndex + 1);
    } else {
        const year = playDate.getFullYear();
        playDate.setMonth(0);
        playDate.setYear(year + 1);
    }
    setNewPlayDate(this, playDate);
}

function setNewPlayDate(app, dateNumberOrString) {
    const clampedDate = clampDate(new Date(dateNumberOrString));
    app.playDate = isPlayDateToday(clampedDate) ? null : clampedDate;
    app.reset();
}

const FIRST_DATE = new Date(2019, 3, 24, 12);

function clampDate(date) {
    if (date > now()) {
        return now();
    }
    if (date < FIRST_DATE) {
        return new Date(FIRST_DATE);
    }
    return date;
}

function getShortDayString() {
    const specialDateString = getSpecialDateString(this.playDate);
    if (specialDateString) {
        return specialDateString;
    }
    const dayOfWeekIndex = this.playDate.getDay();
    const monthIndex = this.playDate.getMonth();
    return [
        SHORT_WEEK_DAY_BY_INDEX[dayOfWeekIndex],
        SHORT_MONTH_BY_INDEX[monthIndex],
        `${this.playDate.getDate()},`,
        this.playDate.getFullYear(),
    ].join(' ');
}

function getSpecialDateString(playDate) {
    if (isPlayDateToday(playDate)) {
        return 'Today';
    }
    if (datesMatch(playDate, FIRST_DATE)) {
        return 'First day 🎂';
    }
    return '';
}
