type IRelation = "token" | "meld_part" | "meld_result" | "combo_piece";
export default interface IRelatedCard {
  id: string; // UUID // A unique ID for this card in Scryfall's database.
  object: "related_card"; // A content type for this object, always related_card.
  component: IRelation; // A field explaining  what role this card plays in this relationship, one of IRelation
  name: string; // The name of this perticular related card.
  type_line: string; // The type line of this card.
  uri: string; // A URI where you can retrive a full object describing this card on Scryfall's API.
}
