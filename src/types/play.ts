export type PlayType =
  | "forehandstroke"
  | "backhandstroke"
  | "forehandreception"
  | "backhandreception"
  | "serve"
  | "forehandlowvolley"
  | "backhandlowvolley"
  | "forehandvolley"
  | "backhandvolley"
  | "forehandhighvolley"
  | "backhandhighvolley"
  | "smash";

export const playTypeDescriptions: Record<PlayType, string> = {
  forehandstroke: "フォアハンドストローク",
  backhandstroke: "バックハンドストローク",
  forehandreception: "フォアハンドレシーブ",
  backhandreception: "バックハンドレシーブ",
  serve: "サーブ",
  forehandlowvolley: "フォアハンドローボレー",
  backhandlowvolley: "バックハンドローボレー",
  forehandvolley: "フォアハンドボレー",
  backhandvolley: "バックハンドボレー",
  forehandhighvolley: "フォアハンドハイボレー",
  backhandhighvolley: "バックハンドハイボレー",
  smash: "スマッシュ",
};
