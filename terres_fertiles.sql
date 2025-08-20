-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 20 août 2025 à 12:10
-- Version du serveur : 9.3.0
-- Version de PHP : 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `terres_fertiles`
--

-- --------------------------------------------------------

--
-- Structure de la table `AmendementOrganique`
--

CREATE TABLE `AmendementOrganique` (
  `id` bigint NOT NULL,
  `nom` varchar(255) NOT NULL,
  `fournisseur` varchar(255) NOT NULL,
  `date_reception` date NOT NULL,
  `date_semis` date NOT NULL,
  `volume_disponible` decimal(10,2) NOT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `responsable_id` bigint DEFAULT NULL,
  `utilisateur_id` bigint DEFAULT NULL,
  `plateforme_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `AmendementOrganique`
--

INSERT INTO `AmendementOrganique` (`id`, `nom`, `fournisseur`, `date_reception`, `date_semis`, `volume_disponible`, `localisation`, `latitude`, `longitude`, `responsable_id`, `utilisateur_id`, `plateforme_id`) VALUES
(1, 'Fumier composté de végétaux', 'PHV', '2025-07-17', '2025-07-17', 1235000.00, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `analyse_laboratoire`
--

CREATE TABLE `analyse_laboratoire` (
  `id` bigint NOT NULL,
  `laboratoire` varchar(255) NOT NULL,
  `code_rapport` varchar(100) NOT NULL,
  `date_reception` date NOT NULL,
  `date_analyse` date NOT NULL,
  `profondeur_prelevement` varchar(100) DEFAULT NULL,
  `localisation_echantillon` varchar(255) DEFAULT NULL,
  `ph_eau` decimal(5,2) DEFAULT NULL,
  `ph_kcl` decimal(5,2) DEFAULT NULL,
  `calcaire_total` decimal(6,2) DEFAULT NULL,
  `calcaire_actif` decimal(6,2) DEFAULT NULL,
  `conductivite` decimal(6,2) DEFAULT NULL,
  `matiere_organique` decimal(6,2) DEFAULT NULL,
  `azote_total` decimal(5,3) DEFAULT NULL,
  `c_n` decimal(5,2) DEFAULT NULL,
  `cec` decimal(6,2) DEFAULT NULL,
  `saturation` decimal(5,2) DEFAULT NULL,
  `argile` decimal(5,2) DEFAULT NULL,
  `limons_fins` decimal(5,2) DEFAULT NULL,
  `limons_grossiers` decimal(5,2) DEFAULT NULL,
  `sables_fins` decimal(5,2) DEFAULT NULL,
  `sables_grossiers` decimal(5,2) DEFAULT NULL,
  `calcium` decimal(6,2) DEFAULT NULL,
  `magnesium` decimal(6,2) DEFAULT NULL,
  `potassium` decimal(6,2) DEFAULT NULL,
  `phosphore` decimal(6,2) DEFAULT NULL,
  `fer` decimal(6,2) DEFAULT NULL,
  `cuivre` decimal(6,2) DEFAULT NULL,
  `zinc` decimal(6,2) DEFAULT NULL,
  `manganese` decimal(6,2) DEFAULT NULL,
  `densite_apparente` decimal(5,2) DEFAULT NULL,
  `porosite_totale` decimal(5,2) DEFAULT NULL,
  `porosite_drainage` decimal(5,2) DEFAULT NULL,
  `eau_capillaire` decimal(5,2) DEFAULT NULL,
  `permeabilite` decimal(6,2) DEFAULT NULL,
  `iam` decimal(5,2) DEFAULT NULL,
  `refus_gravier_2mm` decimal(5,2) DEFAULT NULL,
  `fichier_pdf` varchar(100) DEFAULT NULL,
  `commentaires` longtext,
  `utilisateur_id` bigint DEFAULT NULL,
  `produit_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `authtoken_token`
--

INSERT INTO `authtoken_token` (`key`, `created`, `user_id`) VALUES
('40ab8266dae7378b8a08fab311f5eea9f93ed528', '2025-07-15 11:33:31.497909', 2),
('b43091fb9ddad6a2f2cfea1ec5a9d8268ee2b2a9', '2025-07-15 09:27:03.630029', 1),
('d80e73c2acbb88bd60b42a72ced9b8cb0b2b5fa9', '2025-07-17 13:12:25.072247', 4);

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auth_group`
--

INSERT INTO `auth_group` (`id`, `name`) VALUES
(1, 'terres fertiles');

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auth_group_permissions`
--

INSERT INTO `auth_group_permissions` (`id`, `group_id`, `permission_id`) VALUES
(81, 1, 1),
(82, 1, 2),
(83, 1, 3),
(84, 1, 4),
(85, 1, 5),
(86, 1, 6),
(87, 1, 7),
(88, 1, 8),
(89, 1, 9),
(90, 1, 10),
(91, 1, 11),
(92, 1, 12),
(93, 1, 13),
(94, 1, 14),
(95, 1, 15),
(96, 1, 16),
(97, 1, 17),
(98, 1, 18),
(99, 1, 19),
(100, 1, 20),
(101, 1, 21),
(102, 1, 22),
(103, 1, 23),
(104, 1, 24),
(105, 1, 25),
(106, 1, 26),
(107, 1, 27),
(108, 1, 28),
(109, 1, 29),
(110, 1, 30),
(111, 1, 31),
(112, 1, 32),
(113, 1, 33),
(114, 1, 34),
(115, 1, 35),
(116, 1, 36),
(117, 1, 37),
(118, 1, 38),
(119, 1, 39),
(120, 1, 40),
(121, 1, 41),
(122, 1, 42),
(123, 1, 43),
(124, 1, 44),
(125, 1, 45),
(126, 1, 46),
(127, 1, 47),
(128, 1, 48),
(129, 1, 49),
(130, 1, 50),
(131, 1, 51),
(132, 1, 52),
(133, 1, 53),
(134, 1, 54),
(135, 1, 55),
(136, 1, 56),
(137, 1, 57),
(138, 1, 58),
(139, 1, 59),
(140, 1, 60),
(141, 1, 61),
(142, 1, 62),
(143, 1, 63),
(144, 1, 64),
(145, 1, 65),
(146, 1, 66),
(147, 1, 67),
(148, 1, 68),
(149, 1, 69),
(150, 1, 70),
(151, 1, 71),
(152, 1, 72),
(153, 1, 73),
(154, 1, 74),
(155, 1, 75),
(156, 1, 76),
(157, 1, 77),
(158, 1, 78),
(159, 1, 79),
(160, 1, 80),
(161, 1, 81),
(162, 1, 82),
(163, 1, 83),
(164, 1, 84),
(165, 1, 85),
(166, 1, 86),
(167, 1, 87),
(168, 1, 88),
(169, 1, 89),
(170, 1, 90),
(171, 1, 91),
(172, 1, 92);

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add Token', 6, 'add_token'),
(22, 'Can change Token', 6, 'change_token'),
(23, 'Can delete Token', 6, 'delete_token'),
(24, 'Can view Token', 6, 'view_token'),
(25, 'Can add Token', 7, 'add_tokenproxy'),
(26, 'Can change Token', 7, 'change_tokenproxy'),
(27, 'Can delete Token', 7, 'delete_tokenproxy'),
(28, 'Can view Token', 7, 'view_tokenproxy'),
(29, 'Can add Utilisateur', 8, 'add_customuser'),
(30, 'Can change Utilisateur', 8, 'change_customuser'),
(31, 'Can delete Utilisateur', 8, 'delete_customuser'),
(32, 'Can view Utilisateur', 8, 'view_customuser'),
(33, 'Can add Chantier', 9, 'add_chantier'),
(34, 'Can change Chantier', 9, 'change_chantier'),
(35, 'Can delete Chantier', 9, 'delete_chantier'),
(36, 'Can view Chantier', 9, 'view_chantier'),
(37, 'Can add Gisement', 10, 'add_gisement'),
(38, 'Can change Gisement', 10, 'change_gisement'),
(39, 'Can delete Gisement', 10, 'delete_gisement'),
(40, 'Can view Gisement', 10, 'view_gisement'),
(41, 'Can add Document de gisement', 11, 'add_documentgisement'),
(42, 'Can change Document de gisement', 11, 'change_documentgisement'),
(43, 'Can delete Document de gisement', 11, 'delete_documentgisement'),
(44, 'Can view Document de gisement', 11, 'view_documentgisement'),
(45, 'Can add Mélange', 12, 'add_melange'),
(46, 'Can change Mélange', 12, 'change_melange'),
(47, 'Can delete Mélange', 12, 'delete_melange'),
(48, 'Can view Mélange', 12, 'view_melange'),
(49, 'Can add Ingrédient de mélange', 13, 'add_melangeingredient'),
(50, 'Can change Ingrédient de mélange', 13, 'change_melangeingredient'),
(51, 'Can delete Ingrédient de mélange', 13, 'delete_melangeingredient'),
(52, 'Can view Ingrédient de mélange', 13, 'view_melangeingredient'),
(53, 'Can add Plateforme', 14, 'add_plateforme'),
(54, 'Can change Plateforme', 14, 'change_plateforme'),
(55, 'Can delete Plateforme', 14, 'delete_plateforme'),
(56, 'Can view Plateforme', 14, 'view_plateforme'),
(57, 'Can add Émendent organique', 15, 'add_amendementorganique'),
(58, 'Can change Émendent organique', 15, 'change_amendementorganique'),
(59, 'Can delete Émendent organique', 15, 'delete_amendementorganique'),
(60, 'Can view Émendent organique', 15, 'view_amendementorganique'),
(61, 'Can add Produit de vente', 16, 'add_produitvente'),
(62, 'Can change Produit de vente', 16, 'change_produitvente'),
(63, 'Can delete Produit de vente', 16, 'delete_produitvente'),
(64, 'Can view Produit de vente', 16, 'view_produitvente'),
(65, 'Can add Document technique', 17, 'add_documenttechnique'),
(66, 'Can change Document technique', 17, 'change_documenttechnique'),
(67, 'Can delete Document technique', 17, 'delete_documenttechnique'),
(68, 'Can view Document technique', 17, 'view_documenttechnique'),
(69, 'Can add Analyse de laboratoire', 18, 'add_analyselaboratoire'),
(70, 'Can change Analyse de laboratoire', 18, 'change_analyselaboratoire'),
(71, 'Can delete Analyse de laboratoire', 18, 'delete_analyselaboratoire'),
(72, 'Can view Analyse de laboratoire', 18, 'view_analyselaboratoire'),
(73, 'Can add Amendement de mélange', 19, 'add_melangeamendement'),
(74, 'Can change Amendement de mélange', 19, 'change_melangeamendement'),
(75, 'Can delete Amendement de mélange', 19, 'delete_melangeamendement'),
(76, 'Can view Amendement de mélange', 19, 'view_melangeamendement'),
(77, 'Can add document produit vente', 20, 'add_documentproduitvente'),
(78, 'Can change document produit vente', 20, 'change_documentproduitvente'),
(79, 'Can delete document produit vente', 20, 'delete_documentproduitvente'),
(80, 'Can view document produit vente', 20, 'view_documentproduitvente'),
(81, 'Can add Saisie de vente', 21, 'add_saisievente'),
(82, 'Can change Saisie de vente', 21, 'change_saisievente'),
(83, 'Can delete Saisie de vente', 21, 'delete_saisievente'),
(84, 'Can view Saisie de vente', 21, 'view_saisievente'),
(85, 'Can add Chantier récepteur', 22, 'add_chantierrecepteur'),
(86, 'Can change Chantier récepteur', 22, 'change_chantierrecepteur'),
(87, 'Can delete Chantier récepteur', 22, 'delete_chantierrecepteur'),
(88, 'Can view Chantier récepteur', 22, 'view_chantierrecepteur'),
(89, 'Can add planning', 23, 'add_planning'),
(90, 'Can change planning', 23, 'change_planning'),
(91, 'Can delete planning', 23, 'delete_planning'),
(92, 'Can view planning', 23, 'view_planning');

-- --------------------------------------------------------

--
-- Structure de la table `chantier`
--

CREATE TABLE `chantier` (
  `id` bigint NOT NULL,
  `nom` varchar(255) NOT NULL,
  `maitre_ouvrage` varchar(255) NOT NULL,
  `entreprise_terrassement` varchar(255) NOT NULL,
  `date_creation` date NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `utilisateur_id` bigint DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `chantier`
--

INSERT INTO `chantier` (`id`, `nom`, `maitre_ouvrage`, `entreprise_terrassement`, `date_creation`, `localisation`, `latitude`, `longitude`, `utilisateur_id`, `is_active`) VALUES
(1, 'Mareiton L9', 'Mairie de Lyon 9', 'Maire de Lyon 9', '2025-07-15', 'Lyon 9', 45.7775, 4.8028, NULL, 1),
(5, 'Lyon 5', 'Ville de lyon', 'PHV', '2025-07-31', 'Lyon 5', 48.8566, 2.3522, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `chantier_recepteur`
--

CREATE TABLE `chantier_recepteur` (
  `id` bigint NOT NULL,
  `nom` varchar(255) NOT NULL,
  `projet_nom` varchar(255) NOT NULL,
  `adresse` longtext NOT NULL,
  `date_creation` date NOT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `volume_receptionne` decimal(10,2) DEFAULT NULL,
  `volume_restant` decimal(10,2) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `statut` varchar(20) NOT NULL,
  `responsable_id` bigint DEFAULT NULL,
  `vente_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `core_documentproduitvente`
--

CREATE TABLE `core_documentproduitvente` (
  `id` bigint NOT NULL,
  `type_document` varchar(50) NOT NULL,
  `fichier` varchar(100) NOT NULL,
  `remarque` longtext,
  `date_ajout` datetime(6) NOT NULL,
  `produit_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `core_documentproduitvente`
--

INSERT INTO `core_documentproduitvente` (`id`, `type_document`, `fichier`, `remarque`, `date_ajout`, `produit_id`) VALUES
(7, 'SUIVI', 'documents_produits/conceptionDiag___Mermaid_Chart-2025-07-21-122050_WYRwDIJ.png', '', '2025-07-22 13:16:33.824232', 2);

-- --------------------------------------------------------

--
-- Structure de la table `core_planning`
--

CREATE TABLE `core_planning` (
  `id` bigint NOT NULL,
  `titre` varchar(255) NOT NULL,
  `date_debut` date NOT NULL,
  `duree_jours` int NOT NULL,
  `statut` varchar(50) NOT NULL,
  `melange_id` bigint NOT NULL,
  `responsable_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `core_planning`
--

INSERT INTO `core_planning` (`id`, `titre`, `date_debut`, `duree_jours`, `statut`, `melange_id`, `responsable_id`) VALUES
(79, 'bb', '2025-01-15', 1, 'active', 8, 2),
(80, 'toto', '2025-01-15', 1, 'planned', 7, 2),
(81, 'conformité', '2025-03-01', 2, 'done', 7, 2),
(82, 'essi', '2025-02-01', 1, 'active', 8, 4);

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL
) ;

--
-- Déchargement des données de la table `django_admin_log`
--

INSERT INTO `django_admin_log` (`id`, `action_time`, `object_id`, `object_repr`, `action_flag`, `change_message`, `content_type_id`, `user_id`) VALUES
(1, '2025-07-15 11:37:25.744239', '1', 'Plateforme - TF01', 1, '[{\"added\": {}}]', 14, 2),
(2, '2025-07-15 11:38:00.502284', '1', 'Plateforme - TF01', 2, '[{\"changed\": {\"fields\": [\"Responsable\"]}}]', 14, 2),
(3, '2025-07-15 12:03:10.051207', '1', 'Produit MEL-258-M01-TF01-FVT - TF01', 1, '[{\"added\": {}}]', 16, 2),
(4, '2025-07-15 12:46:29.676035', '1', 'Produit MEL-258-M01-TF01-FVT - TF01', 2, '[{\"changed\": {\"fields\": [\"Date disponibilite\"]}}]', 16, 2),
(5, '2025-07-16 08:24:34.819622', '1', 'Mélange MEL-25-M01-TF0-FVT - État: Contrôle +1 mois', 3, '', 12, 2),
(6, '2025-07-16 09:01:59.134011', '2', 'Mélange MEL-25-M01-TF0-FVT - État: Validation finale (Fiche technique)', 3, '', 12, 2),
(7, '2025-07-16 09:29:36.779445', '3', 'Mélange MEL-25-M01-TF0-FVT - État: Validation finale (Fiche technique)', 3, '', 12, 2),
(8, '2025-07-16 09:40:14.469928', '4', 'Mélange MEL-25-M01-TF0-FVT - État: Composition', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Ingr\\u00e9dient de m\\u00e9lange\", \"object\": \"GIS-2025-MAREITON_L9 dans MEL-25-M01-TF0-FVT (45%)\"}}, {\"added\": {\"name\": \"Ingr\\u00e9dient de m\\u00e9lange\", \"object\": \"GIS-2025-MAREITON_L9-3 dans MEL-25-M01-TF0-FVT (35%)\"}}]', 12, 2),
(9, '2025-07-16 09:40:29.371856', '4', 'Mélange MEL-25-M01-TF0-FVT - État: Composition', 2, '[{\"changed\": {\"fields\": [\"Ordre conformite\"]}}]', 12, 2),
(10, '2025-07-16 09:41:06.269028', '4', 'Mélange MEL-25-M01-TF0-FVT - État: Composition', 2, '[{\"changed\": {\"fields\": [\"Ordre conformite\"]}}]', 12, 2),
(11, '2025-07-16 09:42:33.556086', '4', 'Mélange MEL-25-M01-TF0-FVT - État: Composition', 3, '', 12, 2),
(12, '2025-07-16 09:45:55.505855', '5', 'Mélange MEL-25-M01-TF0-FVT - État: Ordre de conformité', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Ingr\\u00e9dient de m\\u00e9lange\", \"object\": \"GIS-2025-MAREITON_L9-2 dans MEL-25-M01-TF0-FVT (45%)\"}}]', 12, 2),
(13, '2025-07-16 09:46:46.650215', '5', 'Mélange MEL-25-M01-TF0-FVT - État: Ordre de conformité', 3, '', 12, 2),
(14, '2025-07-17 13:51:41.301556', '2', 'Plateforme - T2', 1, '[{\"added\": {}}]', 14, 2),
(15, '2025-07-17 13:59:23.391466', '2', 'Produit hhhh - None', 1, '[{\"added\": {}}]', 16, 2),
(16, '2025-07-17 17:16:35.332003', '1', 'Émendent organique - Test (PHV)', 1, '[{\"added\": {}}]', 15, 2),
(17, '2025-07-18 10:52:08.194480', '6', 'Mélange MEL-25-M01-TF0-PHV - État: Consignes de mélange', 2, '[{\"changed\": {\"fields\": [\"Utilisateur\"]}}]', 12, 2),
(18, '2025-07-18 11:06:26.737622', '6', 'Mélange MEL-25-M01-TF0-PHV - État: Consignes de mélange', 2, '[{\"changed\": {\"fields\": [\"Utilisateur\"]}}]', 12, 2),
(19, '2025-07-18 11:07:38.392405', '4', 'terres fetiles (Entreprise)', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]', 8, 2),
(20, '2025-07-18 11:08:07.113407', '6', 'Mélange MEL-25-M01-TF0-PHV - État: Consignes de mélange', 2, '[{\"changed\": {\"fields\": [\"Utilisateur\"]}}]', 12, 2),
(21, '2025-07-18 11:10:03.723052', '2', 'Terres Fertiles (Entreprise)', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\", \"Role\", \"Nom de l\'entreprise\"]}}]', 8, 2),
(22, '2025-07-18 11:12:00.708167', '3', 'terres fertiles (Entreprise)', 3, '', 8, 2),
(23, '2025-07-18 11:12:43.732351', '1', 'Terres fertiles (Exploitant)', 2, '[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]', 8, 2),
(24, '2025-07-18 11:19:59.664773', '4', 'terres fetiles (Entreprise)', 2, '[{\"changed\": {\"fields\": [\"Username\"]}}]', 8, 2),
(25, '2025-07-18 11:36:52.682040', '1', 'Émendent organique - Fumier (PHV)', 2, '[{\"changed\": {\"fields\": [\"Nom\"]}}]', 15, 2),
(26, '2025-07-18 11:38:40.350914', '1', 'Émendent organique - Fumier composté de végétaux (PHV)', 2, '[{\"changed\": {\"fields\": [\"Nom\"]}}]', 15, 2),
(27, '2025-07-22 12:06:50.485059', NULL, 'Analyse - hhhh', 1, '[{\"added\": {}}]', 20, 2),
(28, '2025-07-22 12:07:21.936380', '5', 'Analyse - hhhh', 3, '', 20, 2),
(29, '2025-07-22 12:07:21.936429', '4', 'Analyse - hhhh', 3, '', 20, 2),
(30, '2025-07-22 12:07:21.936462', '3', 'Analyse - hhhh', 3, '', 20, 2),
(31, '2025-07-22 12:07:21.936490', '2', 'Analyse - hhhh', 3, '', 20, 2),
(32, '2025-07-22 12:07:21.936517', '1', 'Analyse - hhhh', 3, '', 20, 2),
(33, '2025-07-22 12:24:16.638023', '1', 'Terres fertiles (Client)', 2, '[{\"changed\": {\"fields\": [\"Role\"]}}]', 8, 2),
(34, '2025-07-22 12:28:14.799559', '2', 'Terres Fertiles (Client)', 2, '[{\"changed\": {\"fields\": [\"Role\"]}}]', 8, 2),
(35, '2025-07-22 13:06:37.377715', '2', 'Terres Fertiles (Entreprise)', 2, '[{\"changed\": {\"fields\": [\"Role\"]}}]', 8, 2),
(36, '2025-07-22 13:07:09.222448', '2', 'Terres Fertiles (Client)', 2, '[{\"changed\": {\"fields\": [\"Role\"]}}]', 8, 2),
(37, '2025-07-22 13:08:45.043417', '4', 'terres fetiles (Client)', 2, '[{\"changed\": {\"fields\": [\"Role\"]}}]', 8, 2),
(38, '2025-07-23 08:50:59.867764', '1', 'ismael (Client)', 2, '[{\"changed\": {\"fields\": [\"Staff status\"]}}]', 8, 2),
(39, '2025-07-23 08:55:02.326003', '1', 'terres fertiles', 1, '[{\"added\": {}}]', 3, 2),
(40, '2025-07-23 08:55:08.272053', '1', 'ismael (Client)', 2, '[{\"changed\": {\"fields\": [\"Groups\"]}}]', 8, 2),
(41, '2025-07-23 08:57:28.741118', '1', 'terres fertiles', 2, '[{\"changed\": {\"fields\": [\"Permissions\"]}}]', 3, 1),
(42, '2025-07-23 08:59:33.264852', '1', 'terres fertiles', 2, '[{\"changed\": {\"fields\": [\"Permissions\"]}}]', 3, 2),
(43, '2025-07-23 09:22:46.612663', '1', 'terres fertiles', 2, '[{\"changed\": {\"fields\": [\"Permissions\"]}}]', 3, 1),
(44, '2025-07-25 11:08:30.879319', '7', 'Mélange MEL-25-M02-T2-GBF - État: Composition', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Ingr\\u00e9dient de m\\u00e9lange\", \"object\": \"GIS-2025-MAREITON_L9 dans MEL-25-M02-T2-GBF (25%)\"}}, {\"added\": {\"name\": \"Ingr\\u00e9dient de m\\u00e9lange\", \"object\": \"GIS-2025-MAREITON_L9-3 dans MEL-25-M02-T2-GBF (12%)\"}}]', 12, 1),
(45, '2025-07-26 00:25:59.352428', '1', 'terres fertiles', 2, '[{\"changed\": {\"fields\": [\"Permissions\"]}}]', 3, 1),
(46, '2025-07-26 00:26:25.193126', '10', 'Hh (Mélange MEL-25-M01-TF0-PHV)', 2, '[{\"changed\": {\"fields\": [\"Responsable\"]}}]', 23, 1),
(47, '2025-07-26 00:26:40.192648', '9', 'analyse completz (Mélange MEL-25-M02-T2-GBF)', 2, '[{\"changed\": {\"fields\": [\"Responsable\"]}}]', 23, 1),
(48, '2025-07-26 00:27:09.290201', '5', 'Interv 3 (Mélange MEL-25-M02-T2-GBF)', 2, '[{\"changed\": {\"fields\": [\"Responsable\"]}}]', 23, 1),
(49, '2025-07-26 00:27:19.912520', '3', 'Intervention 1 (Mélange MEL-25-M01-TF0-PHV)', 2, '[{\"changed\": {\"fields\": [\"Responsable\"]}}]', 23, 1),
(50, '2025-07-28 06:05:24.152232', '8', 'Mélange MEL-25-M03-T2-PHV', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Ingr\\u00e9dient de m\\u00e9lange\", \"object\": \"GIS-2025-MAREITON_L9-2 dans MEL-25-M03-T2-PHV (22%)\"}}]', 12, 1),
(51, '2025-07-28 06:08:26.813130', '3', 'Plateforme - PTF-BRON-PHV', 1, '[{\"added\": {}}]', 14, 1),
(52, '2025-07-28 06:09:46.577093', '5', 'Gisement - GIS-2025-MAREITON_L9-4', 1, '[{\"added\": {}}]', 10, 1),
(53, '2025-07-28 06:11:01.283980', '9', 'Mélange MEL-25-M04-PTF-PHP', 1, '[{\"added\": {}}, {\"added\": {\"name\": \"Ingr\\u00e9dient de m\\u00e9lange\", \"object\": \"GIS-2025-MAREITON_L9-4 dans MEL-25-M04-PTF-PHP (26%)\"}}]', 12, 1),
(54, '2025-07-31 09:40:32.902213', '1', 'Vente Pierre GEORGES - hhhh - Validée', 1, '[{\"added\": {}}]', 21, 1),
(55, '2025-07-31 11:22:23.501700', '1', 'Terre (OPT)', 1, '[{\"added\": {}}]', 22, 1),
(56, '2025-08-01 09:57:07.898638', '1', 'Vente Pierre GEORGES - hhhh - Validée', 2, '[]', 21, 1),
(57, '2025-08-01 09:59:29.399388', '1', 'Vente Pierre GEORGES - hhhh - Validée', 2, '[]', 21, 1),
(58, '2025-08-01 10:00:03.651482', '1', 'Vente Pierre GEORGES - hhhh - Validée', 2, '[{\"changed\": {\"fields\": [\"Volume tonne\"]}}]', 21, 1),
(59, '2025-08-01 10:05:15.846636', '1', 'Vente Pierre GEORGES - hhhh - Validée', 2, '[{\"changed\": {\"fields\": [\"Voulume m3\"]}}]', 21, 1),
(60, '2025-08-01 10:23:24.630680', '1', 'Vente Pierre GEORGES - hhhh - Validée', 3, '', 21, 1),
(61, '2025-08-01 10:30:59.682995', '3', 'Produit MEL-25-M03-T2-PHV - MEL-25-M03-T2-PHV (PHV)', 1, '[{\"added\": {}}]', 16, 1),
(62, '2025-08-01 10:31:13.076100', '2', 'Vente Pierre GOEORGES - MEL-25-M03-T2-PHV - Validée', 1, '[{\"added\": {}}]', 21, 1),
(63, '2025-08-01 10:46:02.381528', '3', 'Produit MEL-25-M03-T2-PHV - MEL-25-M03-T2-PHV (PHV)', 2, '[{\"changed\": {\"fields\": [\"Volume vendu\"]}}]', 16, 1),
(64, '2025-08-01 12:34:47.893301', '8', 'Mélange MEL-25-M03-T2-PHV', 2, '[{\"changed\": {\"fields\": [\"Couverture vegetale\", \"Periode melange\"]}}]', 12, 1);

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(6, 'authtoken', 'token'),
(7, 'authtoken', 'tokenproxy'),
(4, 'contenttypes', 'contenttype'),
(15, 'core', 'amendementorganique'),
(18, 'core', 'analyselaboratoire'),
(9, 'core', 'chantier'),
(22, 'core', 'chantierrecepteur'),
(8, 'core', 'customuser'),
(11, 'core', 'documentgisement'),
(20, 'core', 'documentproduitvente'),
(17, 'core', 'documenttechnique'),
(10, 'core', 'gisement'),
(12, 'core', 'melange'),
(19, 'core', 'melangeamendement'),
(13, 'core', 'melangeingredient'),
(23, 'core', 'planning'),
(14, 'core', 'plateforme'),
(16, 'core', 'produitvente'),
(21, 'core', 'saisievente'),
(5, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-07-15 09:06:46.412796'),
(2, 'contenttypes', '0002_remove_content_type_name', '2025-07-15 09:06:46.441113'),
(3, 'auth', '0001_initial', '2025-07-15 09:06:46.524740'),
(4, 'auth', '0002_alter_permission_name_max_length', '2025-07-15 09:06:46.545215'),
(5, 'auth', '0003_alter_user_email_max_length', '2025-07-15 09:06:46.549622'),
(6, 'auth', '0004_alter_user_username_opts', '2025-07-15 09:06:46.553885'),
(7, 'auth', '0005_alter_user_last_login_null', '2025-07-15 09:06:46.559231'),
(8, 'auth', '0006_require_contenttypes_0002', '2025-07-15 09:06:46.560606'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2025-07-15 09:06:46.564498'),
(10, 'auth', '0008_alter_user_username_max_length', '2025-07-15 09:06:46.568768'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2025-07-15 09:06:46.573280'),
(12, 'auth', '0010_alter_group_name_max_length', '2025-07-15 09:06:46.583045'),
(13, 'auth', '0011_update_proxy_permissions', '2025-07-15 09:06:46.587760'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2025-07-15 09:06:46.592227'),
(15, 'core', '0001_initial', '2025-07-15 09:06:47.352169'),
(16, 'admin', '0001_initial', '2025-07-15 09:06:47.410949'),
(17, 'admin', '0002_logentry_remove_auto_add', '2025-07-15 09:06:47.430030'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2025-07-15 09:06:47.447660'),
(19, 'authtoken', '0001_initial', '2025-07-15 09:06:47.509148'),
(20, 'authtoken', '0002_auto_20160226_1747', '2025-07-15 09:06:47.573669'),
(21, 'authtoken', '0003_tokenproxy', '2025-07-15 09:06:47.576504'),
(22, 'authtoken', '0004_alter_tokenproxy_options', '2025-07-15 09:06:47.582436'),
(23, 'sessions', '0001_initial', '2025-07-15 09:06:47.595305'),
(24, 'core', '0002_alter_chantier_date_creation_and_more', '2025-07-15 10:00:17.354785'),
(25, 'core', '0003_alter_gisement_date_creation_and_more', '2025-07-15 12:17:18.560741'),
(26, 'core', '0004_produitvente_pret_pour_vente_documentproduitvente', '2025-07-22 11:11:53.551439'),
(27, 'core', '0005_saisievente_chantierrecepteur', '2025-07-23 09:14:16.336798'),
(28, 'core', '0006_alter_chantierrecepteur_adresse_planning', '2025-07-25 09:34:25.488100'),
(29, 'core', '0007_planning_responsable', '2025-07-26 00:21:23.871880'),
(30, 'core', '0008_remove_produitvente_volume_vendu_and_more', '2025-08-01 09:55:35.599641'),
(31, 'core', '0009_remove_produitvente_densite_and_more', '2025-08-01 10:38:56.870270'),
(32, 'core', '0010_remove_produitvente_volume_disponible', '2025-08-01 21:51:08.135450'),
(33, 'core', '0011_chantier_is_active', '2025-08-07 10:12:14.564685');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('d674fxs1igjzj8v2ats2f6sykm7h0lj4', '.eJxVjEEOgjAQRe_StWmmYOnUpXvO0EyHGUENTSisjHdXEha6_e-9_zKJtnVMW5UlTYO5GGdOv1smfsi8g-FO861YLvO6TNnuij1otX0Z5Hk93L-Dker4rRmUXMyoCm0EAWQRcuRDx2d26Bsm1zadukA5gBcVzYBBAbsYCdG8P_o4ODc:1unz9J:vWUdZCGg3a4trCfXrXkDYMxKE5vXMFUt9hC0THz-Xyk', '2025-09-01 12:39:41.804897'),
('emvgk19xmml5t7mh236q4sk0l4z102ux', '.eJxVjEEOgjAQRe_StWmmYOnUpXvO0EyHGUENTSisjHdXEha6_e-9_zKJtnVMW5UlTYO5GGdOv1smfsi8g-FO861YLvO6TNnuij1otX0Z5Hk93L-Dker4rRmUXMyoCm0EAWQRcuRDx2d26Bsm1zadukA5gBcVzYBBAbsYCdG8P_o4ODc:1uhS7P:oyl6gAflLAv1kUE7LLVHPto_WIG4HoK5IxfqvsHA_a4', '2025-08-14 12:10:43.571055');

-- --------------------------------------------------------

--
-- Structure de la table `document_gisement`
--

CREATE TABLE `document_gisement` (
  `id` bigint NOT NULL,
  `type_document` varchar(50) DEFAULT NULL,
  `fichier` varchar(100) DEFAULT NULL,
  `nom_fichier` varchar(255) DEFAULT NULL,
  `description` longtext,
  `date_ajout` datetime(6) NOT NULL,
  `utilisateur_id` bigint DEFAULT NULL,
  `gisement_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `document_gisement`
--

INSERT INTO `document_gisement` (`id`, `type_document`, `fichier`, `nom_fichier`, `description`, `date_ajout`, `utilisateur_id`, `gisement_id`) VALUES
(1, 'autre', 'documents_gisements/Diag_db_terres_fertiles.drawio', 'Diag_db_terres_fertiles.drawio', 'Document uploadé: Diag_db_terres_fertiles.drawio', '2025-07-17 13:33:51.385095', NULL, 4),
(3, 'autre', 'documents_gisements/Developpeur_web.pdf', 'Développeur_web.pdf', 'Document uploadé: Développeur_web.pdf', '2025-07-17 13:33:51.386059', NULL, 4),
(10, 'autre', 'documents_gisements/POINTAGE_JUIN_2025_Ismaila_Sacko_1.xlsx', 'POINTAGE_JUIN_2025_Ismaila Sacko (1).xlsx', 'Document uploadé: POINTAGE_JUIN_2025_Ismaila Sacko (1).xlsx', '2025-08-05 09:23:56.209096', NULL, 1),
(11, 'autre', 'documents_gisements/IMG_2490.HEIC', 'IMG_2490.HEIC', 'Document uploadé: IMG_2490.HEIC', '2025-08-05 12:05:19.323349', NULL, 1),
(12, 'autre', 'documents_gisements/RAPPORT_DE_STAGE.docx', 'RAPPORT DE STAGE.docx', 'Document uploadé: RAPPORT DE STAGE.docx', '2025-08-05 12:08:15.050787', NULL, 1),
(13, 'autre', 'documents_gisements/IMG_2490_7aelxfB.HEIC', 'IMG_2490.HEIC', 'Document uploadé: IMG_2490.HEIC', '2025-08-05 12:08:15.066526', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `document_technique`
--

CREATE TABLE `document_technique` (
  `id` bigint NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `fichier` varchar(100) NOT NULL,
  `type_document` varchar(100) NOT NULL,
  `date_ajout` date NOT NULL,
  `produit_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gisement`
--

CREATE TABLE `gisement` (
  `id` bigint NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `date_creation` date NOT NULL,
  `commune` varchar(100) NOT NULL,
  `periode_terrassement` varchar(100) NOT NULL,
  `volume_terrasse` decimal(10,2) NOT NULL,
  `materiau` varchar(255) NOT NULL,
  `localisation` varchar(255) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `type_de_sol` varchar(20) NOT NULL,
  `chantier_id` bigint NOT NULL,
  `utilisateur_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `gisement`
--

INSERT INTO `gisement` (`id`, `nom`, `date_creation`, `commune`, `periode_terrassement`, `volume_terrasse`, `materiau`, `localisation`, `latitude`, `longitude`, `type_de_sol`, `chantier_id`, `utilisateur_id`) VALUES
(1, 'GIS-2025-MAREITON_L9', '2025-07-15', 'Lyon', 'juillet-2025', 56000.00, 'limon', 'Lyon 9', 45.77753, 4.80285, 'limon', 1, NULL),
(3, 'GIS-2025-MAREITON_L9-2', '2025-07-15', 'Lyon 9', 'septembre-2024', 45000.00, 'Cailloux', 'Rue Mariéton (Lyon 9)', 45.77747, 4.80273, 'caillouteux', 1, NULL),
(4, 'GIS-2025-MAREITON_L9-3', '2025-07-15', 'Lyon 9', 'juillet-2025', 15000.00, 'limon', 'Rue Mariéton Lyon 9', 45.77751, 4.802897, 'limon', 1, NULL),
(5, 'GIS-2025-MAREITON_L9-4', '2025-07-28', 'Bron', 'juin-2025', 125000.00, 'sableux', 'Bron', NULL, NULL, 'sableux', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `melange`
--

CREATE TABLE `melange` (
  `id` bigint NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `date_creation` date NOT NULL,
  `date_semis` date NOT NULL,
  `reference_produit` varchar(100) NOT NULL,
  `fournisseur` varchar(255) NOT NULL,
  `couverture_vegetale` varchar(100) DEFAULT NULL,
  `periode_melange` varchar(100) NOT NULL,
  `references_analyses` longtext,
  `etat` int NOT NULL,
  `ordre_conformite` varchar(100) DEFAULT NULL,
  `consignes_melange` varchar(100) DEFAULT NULL,
  `controle_1` varchar(100) DEFAULT NULL,
  `controle_2` varchar(100) DEFAULT NULL,
  `fiche_technique` varchar(100) DEFAULT NULL,
  `utilisateur_id` bigint DEFAULT NULL,
  `plateforme_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `melange`
--

INSERT INTO `melange` (`id`, `nom`, `date_creation`, `date_semis`, `reference_produit`, `fournisseur`, `couverture_vegetale`, `periode_melange`, `references_analyses`, `etat`, `ordre_conformite`, `consignes_melange`, `controle_1`, `controle_2`, `fiche_technique`, `utilisateur_id`, `plateforme_id`) VALUES
(6, 'MEL-25-M01-TF0-PHV', '2025-07-17', '2024-07-17', 'MEL-25-M01-TF0-PHV', 'PHV', 'tresfles', 'juillet-2024', '', 1, '', '', '', '', '', 2, 1),
(7, 'MEL-25-M02-T2-GBF', '2025-07-25', '2025-07-25', 'MEL-25-M04-T2-GBF', 'gbf', 'trefle', 'mai_2025', '', 6, '', '', '', '', '', NULL, 2),
(8, 'MEL-25-M03-T2-PHV', '2025-07-28', '2025-07-28', 'MEL-25-M04-T2-PHV', 'phv', 'Trèsfles', 'Juillet+-2025', '', 1, '', '', '', '', '', 1, 2),
(9, 'MEL-25-M04-PTF-PHP', '2025-07-28', '2025-07-28', 'MEL-25-M04-PTF-PHP', 'PHP', 'Trèfles', 'juin-0204', '', 3, '', '', '', '', '', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `melange_emendement`
--

CREATE TABLE `melange_emendement` (
  `id` bigint NOT NULL,
  `pourcentage` decimal(5,2) DEFAULT NULL,
  `amendementOrganique_id` bigint NOT NULL,
  `melange_id` bigint NOT NULL,
  `utlisateur_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `melange_emendement`
--

INSERT INTO `melange_emendement` (`id`, `pourcentage`, `amendementOrganique_id`, `melange_id`, `utlisateur_id`) VALUES
(1, 12.00, 1, 6, NULL),
(2, 39.00, 1, 8, NULL),
(3, 23.00, 1, 7, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `melange_ingredient`
--

CREATE TABLE `melange_ingredient` (
  `id` bigint NOT NULL,
  `pourcentage` decimal(5,2) NOT NULL,
  `gisement_id` bigint NOT NULL,
  `melange_id` bigint NOT NULL,
  `utilisateur_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `melange_ingredient`
--

INSERT INTO `melange_ingredient` (`id`, `pourcentage`, `gisement_id`, `melange_id`, `utilisateur_id`) VALUES
(25, 23.00, 3, 6, NULL),
(26, 30.00, 4, 6, NULL),
(27, 35.00, 1, 6, NULL),
(28, 25.00, 1, 7, 1),
(29, 12.00, 4, 7, 1),
(31, 26.00, 5, 9, 1),
(41, 15.00, 3, 8, NULL),
(42, 10.00, 1, 8, NULL),
(43, 19.00, 5, 8, NULL),
(44, 17.00, 4, 8, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `plateforme`
--

CREATE TABLE `plateforme` (
  `id` bigint NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `localisation` varchar(255) NOT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `date_creation` date NOT NULL,
  `responsable_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `plateforme`
--

INSERT INTO `plateforme` (`id`, `nom`, `localisation`, `latitude`, `longitude`, `date_creation`, `responsable_id`) VALUES
(1, 'TF01', 'Bron Aviation', NULL, NULL, '2025-07-15', 1),
(2, 'T2', 'BRON', NULL, NULL, '2025-07-17', NULL),
(3, 'PTF-BRON-PHV', 'BRON', NULL, NULL, '2025-07-28', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `produit_vente`
--

CREATE TABLE `produit_vente` (
  `id` bigint NOT NULL,
  `reference_produit` varchar(100) NOT NULL,
  `fournisseur` varchar(255) NOT NULL,
  `nom_site` varchar(255) DEFAULT NULL,
  `volume_initial` decimal(10,2) NOT NULL,
  `date_disponibilite` date NOT NULL,
  `commentaires_analyses` longtext,
  `acheteur` varchar(255) DEFAULT NULL,
  `date_achat` date DEFAULT NULL,
  `periode_destockage` varchar(255) NOT NULL,
  `localisation_projet` varchar(255) NOT NULL,
  `date_creation` date NOT NULL,
  `melange_id` bigint NOT NULL,
  `utilisateur_id` bigint DEFAULT NULL,
  `pret_pour_vente` tinyint(1) NOT NULL,
  `volume_vendu` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produit_vente`
--

INSERT INTO `produit_vente` (`id`, `reference_produit`, `fournisseur`, `nom_site`, `volume_initial`, `date_disponibilite`, `commentaires_analyses`, `acheteur`, `date_achat`, `periode_destockage`, `localisation_projet`, `date_creation`, `melange_id`, `utilisateur_id`, `pret_pour_vente`, `volume_vendu`) VALUES
(2, 'hhhh', 'gfr', NULL, 23456.00, '2025-07-17', '', NULL, NULL, '', '', '2025-07-17', 6, 2, 0, NULL),
(3, 'MEL-25-M03-T2-PHV', 'PHV', 'Rilleux', 150000.00, '2025-08-01', '', NULL, '2025-08-01', 'Juin 2025', 'Rilleux', '2025-08-01', 8, 1, 1, 30000.00);

-- --------------------------------------------------------

--
-- Structure de la table `saisie_vente`
--

CREATE TABLE `saisie_vente` (
  `id` bigint NOT NULL,
  `nom_client` varchar(255) NOT NULL,
  `volume_tonne` decimal(10,2) NOT NULL,
  `date_vente` date NOT NULL,
  `nom_chantier_recepteur` varchar(255) NOT NULL,
  `adresse_chantier` varchar(255) NOT NULL,
  `est_validee` tinyint(1) NOT NULL,
  `date_achat` datetime(6) NOT NULL,
  `date_modification_vente` datetime(6) NOT NULL,
  `produit_id` bigint NOT NULL,
  `responsable_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `saisie_vente`
--

INSERT INTO `saisie_vente` (`id`, `nom_client`, `volume_tonne`, `date_vente`, `nom_chantier_recepteur`, `adresse_chantier`, `est_validee`, `date_achat`, `date_modification_vente`, `produit_id`, `responsable_id`) VALUES
(2, 'Pierre GOEORGES', 12.00, '2025-07-31', 'PHV', '18 Avenue Maurice Thorez', 1, '2025-08-01 10:31:13.069214', '2025-08-01 10:31:13.069232', 3, 1),
(3, 'Pierre GOEORGES', 12.00, '2025-07-31', 'PHV', '18 Avenue Maurice Thorez', 1, '2025-08-18 13:00:00.458841', '2025-08-18 13:00:00.458867', 3, 4),
(4, 'Pierre GOEORGES', 12.00, '2025-07-31', 'PHV', '18 Avenue Maurice Thorez', 1, '2025-08-18 13:00:40.654294', '2025-08-18 13:00:40.654330', 3, 4),
(5, 'Ismaila', 29.00, '2025-08-31', 'PHV', '18 rue Maurice Thorez', 1, '2025-08-18 20:15:45.341908', '2025-08-20 08:24:11.840120', 3, 2),
(6, 'Emilia', 60.00, '2025-08-31', 'PHV RECET', '18 rue rue maretton 69009', 1, '2025-08-18 20:24:22.828090', '2025-08-18 20:24:22.828136', 3, 2),
(7, 'Antoire', 67.00, '2025-08-19', 'toto', '21 Boulevard Jean Mermoz Lyon 6908', 0, '2025-08-18 22:29:27.262178', '2025-08-20 08:34:30.913479', 2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` bigint NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `role` varchar(20) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `siret_number` varchar(14) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `role`, `company_name`, `siret_number`, `address`, `city`, `postal_code`, `country`, `phone_number`) VALUES
(1, 'pbkdf2_sha256$1000000$uYOnsXdJb0Cp8JMyjK1qnc$8q56vj0nc60xYZv2oh10TWDXaXC9V15WZBqXb911itI=', '2025-08-18 12:39:41.802179', 0, 'ismael', 'Ismaila', 'SACKO', 'ismalsacko@yahoo.fr', 1, 1, '2025-07-15 09:27:03.000000', 'client', 'Terres fertiles', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'pbkdf2_sha256$1000000$BemlTBO9aWBYoum32cxjVC$qRn4Gahy3l2swGWA6Z27T/63KSS0KBt0I6IRgc29j3k=', '2025-08-05 08:43:37.590525', 1, 'terresfertiles', 'Ismaila', 'SACKO', '', 1, 1, '2025-07-15 11:33:31.000000', 'client', 'Terres Fertiles', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'pbkdf2_sha256$1000000$sk16qkSHx8vl0oF5akpRcB$RZKzXLO0/tdRtoIs2M2ePmKYBRU87kWoo/vUoKmum2s=', '2025-07-17 13:13:06.000000', 0, 'Ismaila', 'Ismaila', 'SACKO', 'ismalsacko@gmail.com', 0, 1, '2025-07-17 13:12:24.000000', 'client', 'terres fetiles', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_groups`
--

CREATE TABLE `utilisateur_groups` (
  `id` bigint NOT NULL,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur_groups`
--

INSERT INTO `utilisateur_groups` (`id`, `customuser_id`, `group_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_user_permissions`
--

CREATE TABLE `utilisateur_user_permissions` (
  `id` bigint NOT NULL,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `AmendementOrganique`
--
ALTER TABLE `AmendementOrganique`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom` (`nom`),
  ADD KEY `AmendementOrganique_responsable_id_d4c34530_fk_utilisateur_id` (`responsable_id`),
  ADD KEY `AmendementOrganique_utilisateur_id_49e78dfd_fk_utilisateur_id` (`utilisateur_id`),
  ADD KEY `AmendementOrganique_plateforme_id_95d31247_fk_plateforme_id` (`plateforme_id`);

--
-- Index pour la table `analyse_laboratoire`
--
ALTER TABLE `analyse_laboratoire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `analyse_laboratoire_utilisateur_id_24ab7377_fk_utilisateur_id` (`utilisateur_id`),
  ADD KEY `analyse_laboratoire_produit_id_d873df41_fk_produit_vente_id` (`produit_id`);

--
-- Index pour la table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Index pour la table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Index pour la table `chantier`
--
ALTER TABLE `chantier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chantier_utilisateur_id_77c205d7_fk_utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `chantier_recepteur`
--
ALTER TABLE `chantier_recepteur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vente_id` (`vente_id`),
  ADD KEY `chantier_recepteur_responsable_id_4d2eb24a_fk_utilisateur_id` (`responsable_id`);

--
-- Index pour la table `core_documentproduitvente`
--
ALTER TABLE `core_documentproduitvente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `core_documentproduit_produit_id_d888cb75_fk_produit_v` (`produit_id`);

--
-- Index pour la table `core_planning`
--
ALTER TABLE `core_planning`
  ADD PRIMARY KEY (`id`),
  ADD KEY `core_planning_melange_id_9496e635_fk_melange_id` (`melange_id`),
  ADD KEY `core_planning_responsable_id_1cda8c18_fk_utilisateur_id` (`responsable_id`);

--
-- Index pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_utilisateur_id` (`user_id`);

--
-- Index pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Index pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Index pour la table `document_gisement`
--
ALTER TABLE `document_gisement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_gisement_utilisateur_id_9795266d_fk_utilisateur_id` (`utilisateur_id`),
  ADD KEY `document_gisement_gisement_id_79829249_fk_gisement_id` (`gisement_id`);

--
-- Index pour la table `document_technique`
--
ALTER TABLE `document_technique`
  ADD PRIMARY KEY (`id`),
  ADD KEY `document_technique_produit_id_f2922ec9_fk_produit_vente_id` (`produit_id`);

--
-- Index pour la table `gisement`
--
ALTER TABLE `gisement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom` (`nom`),
  ADD KEY `gisement_chantier_id_6fbedfbb_fk_chantier_id` (`chantier_id`),
  ADD KEY `gisement_utilisateur_id_7d77c190_fk_utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `melange`
--
ALTER TABLE `melange`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference_produit` (`reference_produit`),
  ADD KEY `melange_plateforme_id_3061d9d8_fk_plateforme_id` (`plateforme_id`),
  ADD KEY `melange_utilisateur_id_b6380968_fk_utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `melange_emendement`
--
ALTER TABLE `melange_emendement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `melange_emendement_melange_id_amendementOrg_45ffb6bb_uniq` (`melange_id`,`amendementOrganique_id`),
  ADD KEY `melange_emendement_amendementOrganique__f9b04c7b_fk_Amendemen` (`amendementOrganique_id`),
  ADD KEY `melange_emendement_utlisateur_id_3558e0d8_fk_utilisateur_id` (`utlisateur_id`);

--
-- Index pour la table `melange_ingredient`
--
ALTER TABLE `melange_ingredient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `melange_ingredient_melange_id_gisement_id_06edb092_uniq` (`melange_id`,`gisement_id`),
  ADD KEY `melange_ingredient_gisement_id_8f18beb0_fk_gisement_id` (`gisement_id`),
  ADD KEY `melange_ingredient_utilisateur_id_1f2ca3a9_fk_utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `plateforme`
--
ALTER TABLE `plateforme`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plateforme_responsable_id_222a1bee_fk_utilisateur_id` (`responsable_id`);

--
-- Index pour la table `produit_vente`
--
ALTER TABLE `produit_vente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reference_produit` (`reference_produit`),
  ADD UNIQUE KEY `melange_id` (`melange_id`),
  ADD KEY `produit_vente_utilisateur_id_8f6d981e_fk_utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `saisie_vente`
--
ALTER TABLE `saisie_vente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `saisie_vente_produit_id_e468c3a2_fk_produit_vente_id` (`produit_id`),
  ADD KEY `saisie_vente_responsable_id_c72b0d5c_fk_utilisateur_id` (`responsable_id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `siret_number` (`siret_number`);

--
-- Index pour la table `utilisateur_groups`
--
ALTER TABLE `utilisateur_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utilisateur_groups_customuser_id_group_id_0d4fc31d_uniq` (`customuser_id`,`group_id`),
  ADD KEY `utilisateur_groups_group_id_f333a17e_fk_auth_group_id` (`group_id`);

--
-- Index pour la table `utilisateur_user_permissions`
--
ALTER TABLE `utilisateur_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `utilisateur_user_permiss_customuser_id_permission_e2887981_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `utilisateur_user_per_permission_id_0616051c_fk_auth_perm` (`permission_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `AmendementOrganique`
--
ALTER TABLE `AmendementOrganique`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `analyse_laboratoire`
--
ALTER TABLE `analyse_laboratoire`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT pour la table `chantier`
--
ALTER TABLE `chantier`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `chantier_recepteur`
--
ALTER TABLE `chantier_recepteur`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `core_documentproduitvente`
--
ALTER TABLE `core_documentproduitvente`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `core_planning`
--
ALTER TABLE `core_planning`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `document_gisement`
--
ALTER TABLE `document_gisement`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `document_technique`
--
ALTER TABLE `document_technique`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `gisement`
--
ALTER TABLE `gisement`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `melange`
--
ALTER TABLE `melange`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `melange_emendement`
--
ALTER TABLE `melange_emendement`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `melange_ingredient`
--
ALTER TABLE `melange_ingredient`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `plateforme`
--
ALTER TABLE `plateforme`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `produit_vente`
--
ALTER TABLE `produit_vente`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `saisie_vente`
--
ALTER TABLE `saisie_vente`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `utilisateur_groups`
--
ALTER TABLE `utilisateur_groups`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `utilisateur_user_permissions`
--
ALTER TABLE `utilisateur_user_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `AmendementOrganique`
--
ALTER TABLE `AmendementOrganique`
  ADD CONSTRAINT `AmendementOrganique_plateforme_id_95d31247_fk_plateforme_id` FOREIGN KEY (`plateforme_id`) REFERENCES `plateforme` (`id`),
  ADD CONSTRAINT `AmendementOrganique_responsable_id_d4c34530_fk_utilisateur_id` FOREIGN KEY (`responsable_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `AmendementOrganique_utilisateur_id_49e78dfd_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `analyse_laboratoire`
--
ALTER TABLE `analyse_laboratoire`
  ADD CONSTRAINT `analyse_laboratoire_produit_id_d873df41_fk_produit_vente_id` FOREIGN KEY (`produit_id`) REFERENCES `produit_vente` (`id`),
  ADD CONSTRAINT `analyse_laboratoire_utilisateur_id_24ab7377_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_utilisateur_id` FOREIGN KEY (`user_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Contraintes pour la table `chantier`
--
ALTER TABLE `chantier`
  ADD CONSTRAINT `chantier_utilisateur_id_77c205d7_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `chantier_recepteur`
--
ALTER TABLE `chantier_recepteur`
  ADD CONSTRAINT `chantier_recepteur_responsable_id_4d2eb24a_fk_utilisateur_id` FOREIGN KEY (`responsable_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `chantier_recepteur_vente_id_23ecebdf_fk_saisie_vente_id` FOREIGN KEY (`vente_id`) REFERENCES `saisie_vente` (`id`);

--
-- Contraintes pour la table `core_documentproduitvente`
--
ALTER TABLE `core_documentproduitvente`
  ADD CONSTRAINT `core_documentproduit_produit_id_d888cb75_fk_produit_v` FOREIGN KEY (`produit_id`) REFERENCES `produit_vente` (`id`);

--
-- Contraintes pour la table `core_planning`
--
ALTER TABLE `core_planning`
  ADD CONSTRAINT `core_planning_melange_id_9496e635_fk_melange_id` FOREIGN KEY (`melange_id`) REFERENCES `melange` (`id`),
  ADD CONSTRAINT `core_planning_responsable_id_1cda8c18_fk_utilisateur_id` FOREIGN KEY (`responsable_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_utilisateur_id` FOREIGN KEY (`user_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `document_gisement`
--
ALTER TABLE `document_gisement`
  ADD CONSTRAINT `document_gisement_gisement_id_79829249_fk_gisement_id` FOREIGN KEY (`gisement_id`) REFERENCES `gisement` (`id`),
  ADD CONSTRAINT `document_gisement_utilisateur_id_9795266d_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `document_technique`
--
ALTER TABLE `document_technique`
  ADD CONSTRAINT `document_technique_produit_id_f2922ec9_fk_produit_vente_id` FOREIGN KEY (`produit_id`) REFERENCES `produit_vente` (`id`);

--
-- Contraintes pour la table `gisement`
--
ALTER TABLE `gisement`
  ADD CONSTRAINT `gisement_chantier_id_6fbedfbb_fk_chantier_id` FOREIGN KEY (`chantier_id`) REFERENCES `chantier` (`id`),
  ADD CONSTRAINT `gisement_utilisateur_id_7d77c190_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `melange`
--
ALTER TABLE `melange`
  ADD CONSTRAINT `melange_plateforme_id_3061d9d8_fk_plateforme_id` FOREIGN KEY (`plateforme_id`) REFERENCES `plateforme` (`id`),
  ADD CONSTRAINT `melange_utilisateur_id_b6380968_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `melange_emendement`
--
ALTER TABLE `melange_emendement`
  ADD CONSTRAINT `melange_emendement_amendementOrganique__f9b04c7b_fk_Amendemen` FOREIGN KEY (`amendementOrganique_id`) REFERENCES `AmendementOrganique` (`id`),
  ADD CONSTRAINT `melange_emendement_melange_id_ff406033_fk_melange_id` FOREIGN KEY (`melange_id`) REFERENCES `melange` (`id`),
  ADD CONSTRAINT `melange_emendement_utlisateur_id_3558e0d8_fk_utilisateur_id` FOREIGN KEY (`utlisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `melange_ingredient`
--
ALTER TABLE `melange_ingredient`
  ADD CONSTRAINT `melange_ingredient_gisement_id_8f18beb0_fk_gisement_id` FOREIGN KEY (`gisement_id`) REFERENCES `gisement` (`id`),
  ADD CONSTRAINT `melange_ingredient_melange_id_51ebd207_fk_melange_id` FOREIGN KEY (`melange_id`) REFERENCES `melange` (`id`),
  ADD CONSTRAINT `melange_ingredient_utilisateur_id_1f2ca3a9_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `plateforme`
--
ALTER TABLE `plateforme`
  ADD CONSTRAINT `plateforme_responsable_id_222a1bee_fk_utilisateur_id` FOREIGN KEY (`responsable_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `produit_vente`
--
ALTER TABLE `produit_vente`
  ADD CONSTRAINT `produit_vente_melange_id_3eb52a57_fk_melange_id` FOREIGN KEY (`melange_id`) REFERENCES `melange` (`id`),
  ADD CONSTRAINT `produit_vente_utilisateur_id_8f6d981e_fk_utilisateur_id` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `saisie_vente`
--
ALTER TABLE `saisie_vente`
  ADD CONSTRAINT `saisie_vente_produit_id_e468c3a2_fk_produit_vente_id` FOREIGN KEY (`produit_id`) REFERENCES `produit_vente` (`id`),
  ADD CONSTRAINT `saisie_vente_responsable_id_c72b0d5c_fk_utilisateur_id` FOREIGN KEY (`responsable_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `utilisateur_groups`
--
ALTER TABLE `utilisateur_groups`
  ADD CONSTRAINT `utilisateur_groups_customuser_id_5bf3c374_fk_utilisateur_id` FOREIGN KEY (`customuser_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `utilisateur_groups_group_id_f333a17e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `utilisateur_user_permissions`
--
ALTER TABLE `utilisateur_user_permissions`
  ADD CONSTRAINT `utilisateur_user_per_customuser_id_57e74459_fk_utilisate` FOREIGN KEY (`customuser_id`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `utilisateur_user_per_permission_id_0616051c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
