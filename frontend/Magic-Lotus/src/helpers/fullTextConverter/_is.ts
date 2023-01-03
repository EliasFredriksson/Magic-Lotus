const IS_OPTIONS = [
  // ########### CARD VARIANTS ###########
  "split", // Split card
  "flip", // Flip card
  "transform", // Transform card
  "meld", // Meld card
  "leveler", // Level Up card
  "dfc", // Double-faced card
  "mdfc", // Modal double-faced card
  // ########### SPELLS, PERMANENTS AND EFFECTS ###########
  "spell", // Card is spell
  "permanent", // Card is a permanent
  "historic", // Card is historic
  "party", // Card is in party
  "modal", // Modal effects
  "vanilla", // Is a vanilla creature
  "frechcanilla", // French vanilla card
  "bear", // Is a 2/2 creature
  // ########### EXTRA CARDS AND FUNNY CARDS ###########
  "funny", // Un-cards, holiday cards etc.
  // ########### APPEARANCE ###########
  "booster",
  "planeswalker_deck",
  "league",
  "byabox",
  "giftbox",
  "intro_pack",
  "gameday",
  "prerelease",
  "release",
  "fnm",
  "judge_gift",
  "arena_league",
  "player_rewards",
  "media_insert",
  "instore",
  "convention",
  "set_promo",
  // ########### OTHER ###########
  "datestamped", // Has date stamp
  "reserved", // Is on the reserved list
  "reprint", // Cards that are reprints
  // ########### FORMATS ###########
  "standard", // Cards that are in current standard
  "future", // Future cards (Does not have a category yet)
  "historic",
  "gladiator",
  "pioneer",
  "explorer",
  "modern",
  "legacy",
  "pauper",
  "vintage",
  "penny",
  "commander",
  "brawl",
  "historicbrawl",
  "alchemy",
  "paupercommander",
  "duel",
  "oldschool",
  "premodern",
  // ########### CARD EFFECTS ###########
  "foil", // Cards that has foil
  "nonfoil", // Non foil cards
  "old", // 1993 or 1997 variant of the "classic" frame
  "new", // Card with the 2015 holofoil-stamp frame
  "hires", // Cards with high-resolution scans.
  "glossy", // Cards that are glossy
  "etched", // Cards that are etched
  "full", // Cards that have fullart.
  // ########### GAMES, PROMOS & SPOTLIGHTS ###########
  "promo", // Promotional cards
  "spotlight", // Cards that have importance for the MTG story
  "scryfallpreview", // Cards that Scryfall has the honor of previewing
  "digital", // Cards that are only avalible digitally
  // ########### SYMBOLS ###########
  "phyrexian", // Cards that have the phyrexian symbol
  "hybrid", // Cards that have the hybrid symbol
  // ########### REPRINTS ###########
  "unique", // Cards that have not been reprinted in another set.
  "reprint", // Cards that have been reprinted
  // ########### SHORTCUTS AND NICKNAMES ###########
  "dual", // Cards that are dual lands
  "fetchland", // Cards that are fetchlands
  "bikeland",
  "bounceland",
  "canopyland",
  "checkland",
  "fastland",
  "filterland",
  "gainland",
  "painland",
  "scryland",
  "shadowland",
  "shockland",
  "storageland",
  "creatureland",
  "triland",
  "tangoland",
  "masterpiece", // Get all masterpiece series cards
] as const;
type Is = typeof IS_OPTIONS[number];
export default Is;
