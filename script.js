// ============================================================
// 編集ゾーン（Lessonを追加するときはここだけ編集）
//   l: Lesson番号 / ja: 日本語 / en: 英語（答えを ( ) で囲む）
//   t: 品詞（ダミー選択肢は同じ品詞から選ばれる）
//      v=動詞  n=名詞  adj=形容詞  pp=過去分詞（be/get + 〜）
//   ng: ダミーに出してはいけない語（正解にもなり得る語）
//   note: 解説
// ============================================================
const APP_NAME = "Vocabulary L7-L14";
const LOG_URL = "https://script.google.com/macros/s/AKfycbxKR03EDAl1VTOsfabueoNLoXXIpHM878qSxIdOF6FeISJq1j4KzKKVRecR_j63kk9p/exec";
const COUNTS = [10, 20, 30];

const DATA = [
  // ---- L7 ----
  { l: 7, ja: "部活に入る", en: "(join) the club", t: "v", note: "join は「（団体）に加わる」。join to the club とは言わないので注意。" },
  { l: 7, ja: "学校に遅刻する", en: "be (late) for school", t: "adj", note: "be late for 〜 で「〜に遅れる」。late は形容詞なので be動詞が必要。" },
  { l: 7, ja: "避難訓練をする", en: "(have) a fire drill", t: "v", ng: ["hold"], note: "行事や訓練を「行う」は have で表せる。drill は「訓練」。" },
  { l: 7, ja: "教室を清掃する", en: "(clean) the classroom", t: "v", note: "clean は形容詞「きれいな」のほか、動詞「掃除する」としても使う。" },
  { l: 7, ja: "（人の）忠告に従う", en: "(follow) someone's advice", t: "v", ng: ["take"], note: "follow は「あとについて行く」→「従う」。advice は数えられない名詞なので an advice とは言わない。" },
  { l: 7, ja: "制服を着る", en: "(wear) one's uniform", t: "v", note: "wear は「身につけている（状態）」。「着るという動作」は put on。" },
  { l: 7, ja: "あいさつし合う", en: "(greet) each other", t: "v", note: "greet は「あいさつする」。each other は「お互い」で、greet の目的語になる。" },
  { l: 7, ja: "規則を破る", en: "(break) the rules", t: "v", note: "break は「壊す」。規則を「壊す」→「破る」。反対は follow the rules（規則に従う）。" },
  { l: 7, ja: "学校を休む", en: "be (absent) from school", t: "adj", note: "be absent from 〜 で「〜を欠席する」。absent の反対は present（出席して）。" },
  { l: 7, ja: "昼食を持参する", en: "(bring) one's lunch", t: "v", note: "bring は「（話し手のいる所へ）持ってくる」。take は「持っていく」。" },
  // ---- L8 ----
  { l: 8, ja: "席を譲る", en: "(give up) one's seat", t: "v", note: "give up は「手放す・あきらめる」。自分の席を手放す →「席を譲る」。" },
  { l: 8, ja: "〜に似合う", en: "(look) good on 〜", t: "v", note: "look ＋形容詞で「〜に見える」。on 〜 は「〜が身につけていると」の意味。" },
  { l: 8, ja: "写真を撮る", en: "(take) a photo", t: "v", note: "「写真を撮る」は take を使う。photo は photograph の短縮形。" },
  { l: 8, ja: "伝言を伝える", en: "(pass on) one's message", t: "v", note: "pass on は「（次の人へ）渡す」→「伝える」。" },
  { l: 8, ja: "戸締りをする", en: "(lock) up the house", t: "v", note: "lock は「鍵をかける」。up がつくと「しっかり全部」の感じが出る。" },
  { l: 8, ja: "花に水をやる", en: "(water) the flowers", t: "v", note: "water は名詞「水」だけでなく、動詞「水をやる」としても使える。" },
  { l: 8, ja: "おつかいに行く", en: "run (errands)", t: "n", note: "errand は「使い走り・用事」。run errands で「おつかいに行く・用事を済ませる」。" },
  { l: 8, ja: "〜への道をたずねる", en: "ask for (directions) to 〜", t: "n", note: "direction は「方向」。複数形 directions で「道順」の意味になる。" },
  { l: 8, ja: "電話に出る", en: "(answer) the phone", t: "v", note: "answer は「答える」→ 電話に「応答する」。" },
  { l: 8, ja: "スマホで支払う", en: "(pay) with one's smartphone", t: "v", note: "pay は「支払う」。支払いの手段は with 〜 や by 〜 で表す。" },
  // ---- L9 ----
  { l: 9, ja: "〜にある", en: "be (located) in 〜", t: "pp", ng: ["situated"], note: "locate は「置く」。過去分詞 located を使って be located in 〜「〜に置かれている →〜にある」。" },
  { l: 9, ja: "改装する", en: "(renovate)", t: "v", note: "re-（再び）＋ nov（新しい）で「新しくし直す」→「改装する」。" },
  { l: 9, ja: "絵を展示する", en: "(exhibit) paintings", t: "v", note: "exhibit は「展示する」。名詞 exhibition は「展覧会」。" },
  { l: 9, ja: "道路を補修する", en: "(repair) a road", t: "v", note: "repair は「修理する」。fix よりもややかたい言い方。" },
  { l: 9, ja: "建築家", en: "(architect)", t: "n", note: "architect は「建築家」。architecture は「建築（物）」。" },
  { l: 9, ja: "通勤者，通学者", en: "(commuter)", t: "n", note: "commute（通勤・通学する）＋ -er（〜する人）。" },
  { l: 9, ja: "公共交通機関", en: "public (transportation)", t: "n", note: "transportation は「交通機関・輸送」。public は「公共の」。バスや電車のこと。" },
  { l: 9, ja: "建設する", en: "(construct)", t: "v", note: "construct は「建設する・組み立てる」。名詞 construction は「建設」。" },
  { l: 9, ja: "建物を設計する", en: "(design) a building", t: "v", note: "design は名詞「デザイン」のほか、動詞「設計する」としても使う。" },
  { l: 9, ja: "壁にペンキを塗る", en: "(paint) a wall", t: "v", note: "paint は「ペンキ・絵の具を塗る」。絵の具で描くときも paint。" },
  // ---- L10 ----
  { l: 10, ja: "夢をかなえる", en: "make one's dream (come) true", t: "v", note: "come true は「実現する」。make ＋人・もの＋動詞の原形で「〜させる」なので come は原形。" },
  { l: 10, ja: "大学に入る", en: "(enter) university", t: "v", note: "enter は「〜に入る」。すぐ後に場所が続くので enter into とは言わない。" },
  { l: 10, ja: "能力をみがく", en: "(develop) one's skill", t: "v", note: "develop は「発達させる・伸ばす」。skill は「技能・能力」。" },
  { l: 10, ja: "奨学金を得る", en: "get a (scholarship)", t: "n", note: "scholar（学者）＋ -ship。学ぶための「奨学金」。" },
  { l: 10, ja: "資金を調達する", en: "(raise) money", t: "v", note: "raise は「上げる」→ お金を「集める・調達する」。" },
  { l: 10, ja: "自分の会社をつくる", en: "start one's own (company)", t: "n", note: "company は「会社」。start one's own 〜 で「自分の〜を始める」。" },
  { l: 10, ja: "ビジネスを学ぶ", en: "study (business)", t: "n", note: "business は「商売・事業」。学問としての「ビジネス（経営）」も表す。" },
  { l: 10, ja: "資格を取る", en: "get a (qualification)", t: "n", note: "qualification は「資格」。動詞 qualify は「資格を得る」。" },
  { l: 10, ja: "生計を立てる", en: "(earn) a living", t: "v", note: "earn は「（働いて）得る・稼ぐ」。living は名詞で「生計・暮らし」。" },
  { l: 10, ja: "申込書，願書", en: "(application) form", t: "n", note: "application は「申し込み」。動詞 apply（申し込む）の名詞形。form は「用紙」。" },
  // ---- L11 ----
  { l: 11, ja: "健康でいる", en: "(stay) fit", t: "v", ng: ["keep"], note: "stay ＋形容詞で「〜のままでいる」。fit は「体調がよい・健康な」。" },
  { l: 11, ja: "熱中症になる", en: "(get) heatstroke", t: "v", ng: ["have", "suffer"], note: "病気やけがに「なる」は get で表せる。heatstroke は「熱中症」。" },
  { l: 11, ja: "けがをする", en: "get (injured)", t: "pp", note: "injure は「傷つける」。get ＋過去分詞で「〜される」→「けがをする」。" },
  { l: 11, ja: "予防接種を受ける", en: "get a (vaccine)", t: "n", note: "vaccine は「ワクチン」。get a vaccine で「予防接種を受ける」。" },
  { l: 11, ja: "喉が痛い", en: "have a (sore) throat", t: "adj", note: "sore は「（ひりひり）痛い」。throat は「喉」。" },
  { l: 11, ja: "〜に感染する", en: "get (infected) with 〜", t: "pp", note: "infect は「感染させる」。get infected with 〜 で「〜に感染する」。with に注意。" },
  { l: 11, ja: "（病気やけが）から回復する", en: "(recover) from 〜", t: "v", note: "recover は「回復する」。from 〜 で「〜から」。" },
  { l: 11, ja: "定期的に運動する", en: "get (regular) exercise", t: "adj", note: "regular は「定期的な・規則正しい」。exercise は「運動」。" },
  { l: 11, ja: "規則正しい生活をする", en: "(keep) regular hours", t: "v", note: "keep は「保つ」。hours はここでは「（起床・就寝などの）時間」。" },
  { l: 11, ja: "運動する", en: "(work) out", t: "v", note: "work out は「（ジムなどで）運動する・トレーニングする」。" },
  // ---- L12 ----
  { l: 12, ja: "〜をWi-Fiにつなぐ", en: "(connect) 〜 to the Wi-Fi", t: "v", note: "connect A to B で「A を B につなぐ」。" },
  { l: 12, ja: "充電する", en: "(charge)", t: "v", note: "charge は「充電する」。「料金を請求する」の意味もある。" },
  { l: 12, ja: "実用的な", en: "(practical)", t: "adj", note: "practical は「実用的な・役に立つ」。practice（練習・実践）の仲間の語。" },
  { l: 12, ja: "電化製品", en: "(electrical) appliance", t: "adj", note: "electrical は「電気の」。appliance は「（家庭用の）器具」。" },
  { l: 12, ja: "便利な，重宝な", en: "(handy)", t: "adj", note: "handy は「手ごろで便利な」。hand（手）からできた語。" },
  { l: 12, ja: "ゲーム機", en: "game (console)", t: "n", note: "console は「操作盤・本体」。game console で「ゲーム機」。" },
  { l: 12, ja: "更新する", en: "(update)", t: "v", note: "up（最新に）＋ date（日付）で「更新する」。" },
  { l: 12, ja: "設定する", en: "(set) up", t: "v", note: "set up は「設定する・準備する」。" },
  { l: 12, ja: "機器，装置", en: "(device)", t: "n", note: "device は「機器・装置」。スマホやタブレットなどをまとめて指すときにも使う。" },
  { l: 12, ja: "ファイルを添付する", en: "(attach) a file", t: "v", note: "attach は「くっつける」→ メールにファイルを「添付する」。" },
  // ---- L13 ----
  { l: 13, ja: "〜に興味がある", en: "be (interested) in 〜", t: "pp", note: "interest は「興味をもたせる」。be interested in 〜 で「〜に興味がある」。" },
  { l: 13, ja: "写真を投稿する", en: "(post) pictures", t: "v", note: "post は「（SNSなどに）投稿する」。" },
  { l: 13, ja: "イラストを描く", en: "(draw) illustrations", t: "v", note: "draw はペンや鉛筆で「（線で）描く」。絵の具で描くのは paint。" },
  { l: 13, ja: "作曲をする", en: "(compose) music", t: "v", note: "compose は「作曲する・組み立てる」。composer は「作曲家」。" },
  { l: 13, ja: "連絡を取り合う", en: "keep in (touch)", t: "n", note: "touch は名詞で「連絡・接触」。keep in touch で「連絡を取り合う」。" },
  { l: 13, ja: "好きな〜を共有する", en: "(share) one's favorite 〜", t: "v", note: "share は「分け合う・共有する」。" },
  { l: 13, ja: "ゲームをプログラムする", en: "(program) a game", t: "v", note: "program は名詞「番組・計画」のほか、動詞「プログラムを組む」としても使う。" },
  { l: 13, ja: "ウェブを見る", en: "(browse) the web", t: "v", note: "browse は「拾い読みする・見て回る」。ブラウザ（browser）はここから。" },
  { l: 13, ja: "楽器を演奏する", en: "(play) a musical instrument", t: "v", note: "楽器の演奏は play。play the piano のように楽器名には the をつける。" },
  { l: 13, ja: "カードを集める", en: "(collect) cards", t: "v", note: "collect は「集める」。collection は「収集（品）」。" },
  // ---- L14 ----
  { l: 14, ja: "保護する", en: "(preserve)", t: "v", ng: ["protect"], note: "preserve は「（よい状態のまま）保護する・保存する」。" },
  { l: 14, ja: "絶滅した", en: "(extinct)", t: "adj", note: "extinct は「絶滅した」。名詞 extinction は「絶滅」。" },
  { l: 14, ja: "野生生物", en: "(wildlife)", t: "n", note: "wild（野生の）＋ life（生き物）で「野生生物」。" },
  { l: 14, ja: "のどかな", en: "(peaceful)", t: "adj", note: "peace（平和）＋ -ful（〜に満ちた）で「平和な・のどかな」。" },
  { l: 14, ja: "〜に位置する", en: "be (situated) in 〜", t: "pp", ng: ["located"], note: "situate は「置く」。be situated in 〜 で「〜に位置する」。be located in 〜 とほぼ同じ意味。" },
  { l: 14, ja: "〜に囲まれる", en: "be (surrounded) by 〜", t: "pp", note: "surround は「囲む」。受け身 be surrounded by 〜 で「〜に囲まれる」。" },
  { l: 14, ja: "〜に感動する", en: "be (moved) by 〜", t: "pp", ng: ["touched", "impressed"], note: "move は「動かす」→「心を動かす」。be moved by 〜 で「〜に感動する」。" },
  { l: 14, ja: "景観", en: "(landscape)", t: "n", note: "landscape は「（陸の）景色・風景」。" },
  { l: 14, ja: "〜にわくわくする", en: "be (thrilled) with 〜", t: "pp", ng: ["excited"], note: "thrill は「わくわくさせる」。人が主語のときは過去分詞 thrilled を使う。" },
  { l: 14, ja: "絶滅危惧種", en: "(endangered) species", t: "adj", note: "endanger は「危険にさらす」。endangered species で「絶滅の危険がある種」。" },
];

// ============================================================
// ここから下はロジック（通常は編集不要）
// ============================================================
const $ = (id) => document.getElementById(id);

const lessonCount = {};
const ITEMS = DATA.map((d) => {
  lessonCount[d.l] = (lessonCount[d.l] || 0) + 1;
  return { ...d, no: lessonCount[d.l], ans: d.en.match(/\((.+?)\)/)[1] };
});

let quiz = [];
let idx = 0;
let results = [];
let count = COUNTS[0];
let sid = "";

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function blank(item) {
  const b = item.ans.includes(" ") ? "______" : "（　　　　）";
  return item.en.replace(/\((.+?)\)/, b);
}

function filled(item) {
  return item.en.replace(/\((.+?)\)/, `<b>${item.ans}</b>`);
}

function dummies(item) {
  const ng = new Set([item.ans, ...(item.ng || [])].map((s) => s.toLowerCase()));
  const ok = (x) => !ng.has(x.ans.toLowerCase());
  const pools = [
    ITEMS.filter((x) => x.t === item.t && x.l !== item.l && ok(x)),
    ITEMS.filter((x) => x.t === item.t && ok(x)),
    ITEMS.filter(ok),
  ];
  const picks = [];
  for (const pool of pools) {
    for (const x of shuffle(pool)) {
      if (!picks.some((p) => p.toLowerCase() === x.ans.toLowerCase())) picks.push(x.ans);
      if (picks.length === 2) return picks;
    }
  }
  return picks;
}

function show(id) {
  ["start", "quiz", "result"].forEach((s) => ($(s).hidden = s !== id));
  window.scrollTo(0, 0);
}

// ---- スタート画面 ----
try { $("sid").value = localStorage.getItem("sid") || ""; } catch (e) {}

COUNTS.forEach((n) => {
  const b = document.createElement("button");
  b.textContent = `${Math.min(n, ITEMS.length)}問`;
  b.onclick = () => start(n);
  $("counts").appendChild(b);
});

function start(n) {
  const v = $("sid").value.trim();
  if (!/^\d{4}$/.test(v)) {
    $("startMsg").textContent = "学籍番号を4桁の数字で入力してください。";
    return;
  }
  $("startMsg").textContent = "";
  sid = v;
  try { localStorage.setItem("sid", sid); } catch (e) {}
  count = Math.min(n, ITEMS.length);
  quiz = shuffle(ITEMS).slice(0, count);
  idx = 0;
  results = [];
  show("quiz");
  render();
}

// ---- 問題画面 ----
function render() {
  const item = quiz[idx];
  $("progress").textContent = `${idx + 1} / ${quiz.length}`;
  $("lesson").textContent = `Lesson ${item.l} - ${item.no}`;
  $("ja").textContent = item.ja;
  $("en").textContent = blank(item);
  $("feedback").hidden = true;
  $("nextBtn").hidden = true;
  $("skipBtn").hidden = false;

  const box = $("choices");
  box.innerHTML = "";
  shuffle([item.ans, ...dummies(item)]).forEach((c) => {
    const b = document.createElement("button");
    b.textContent = c;
    b.onclick = () => judge(c);
    box.appendChild(b);
  });
}

function judge(choice) {
  const item = quiz[idx];
  const status = choice === null ? "skip" : choice === item.ans ? "correct" : "wrong";
  results.push({
    lesson: item.l, no: item.no, ja: item.ja, en: item.en,
    answer: item.ans, chosen: choice === null ? "" : choice, result: status,
  });

  [...$("choices").children].forEach((b) => {
    b.disabled = true;
    if (b.textContent === item.ans) b.classList.add("ok");
    else if (b.textContent === choice) b.classList.add("ng");
  });

  const label = { correct: "正解！", wrong: "不正解", skip: "とばしました" }[status];
  $("feedback").innerHTML =
    `<p class="judge ${status === "correct" ? "ok" : "ng"}">${label}</p>` +
    `<p class="phrase">${filled(item)}</p>` +
    `<p>${item.ja}</p>` +
    `<p class="note">${item.note}</p>`;
  $("feedback").hidden = false;
  $("skipBtn").hidden = true;
  $("nextBtn").hidden = false;
  $("nextBtn").textContent = idx + 1 < quiz.length ? "次へ" : "結果を見る";
}

$("skipBtn").onclick = () => judge(null);

$("nextBtn").onclick = () => {
  idx++;
  if (idx < quiz.length) render();
  else finish();
};

$("backBtn").onclick = () => {
  if (confirm("はじめの画面にもどりますか？（ここまでの解答は記録されません）")) show("start");
};

// ---- 結果画面 ----
function finish() {
  const correct = results.filter((r) => r.result === "correct").length;
  const skipped = results.filter((r) => r.result === "skip").length;
  $("score").textContent = `${results.length}問中 ${correct}問 正解`;

  const miss = results.filter((r) => r.result !== "correct");
  const rv = $("review");
  rv.innerHTML = "";
  if (miss.length) {
    const h = document.createElement("p");
    h.className = "head";
    h.textContent = "まちがえた・とばしたフレーズ";
    rv.appendChild(h);
    miss.forEach((r) => {
      const p = document.createElement("p");
      p.innerHTML = `${r.ja}<br>${r.en.replace(/\((.+?)\)/, "<b>$1</b>")}`;
      rv.appendChild(p);
    });
  }

  show("result");
  sendLog(correct, skipped);
}

function sendLog(correct, skipped) {
  $("sendMsg").style.color = "#666";
  $("sendMsg").textContent = "記録を送信しています…";
  const payload = {
    studentId: sid,
    app: APP_NAME,
    timestamp: new Date().toISOString(),
    total: results.length,
    correct: correct,
    wrong: results.length - correct - skipped,
    skipped: skipped,
    details: results,
  };
  fetch(LOG_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  })
    .then(() => { $("sendMsg").textContent = "記録を送信しました。"; })
    .catch(() => {
      $("sendMsg").style.color = "#c00";
      $("sendMsg").textContent = "記録を送信できませんでした。通信環境を確認してください。";
    });
}

$("retryBtn").onclick = () => start(count);
$("homeBtn").onclick = () => show("start");
