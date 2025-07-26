# IonicCDN
IonicとReactで仮想スクロール

## React.js を CDN 経由で使う

`<script type="text/babel">` という記述は、React.js を CDN 経由で使う際に JSX（JavaScript XML）をブラウザ上で直接変換・実行するための重要な指定です。

---

### 🧠 背景と目的

通常、React.js を使うには Node.js 環境や npm を使ったプロジェクト構成が必要ですが、記事では「小規模でサクッと開発したい」というニーズに応える方法として、CDN を使った最小構成を紹介しています。

その中で `<script type="text/babel">` は、JSX をブラウザ上で直接 JavaScript に変換するために使われます。

---

### 🔍 役割と仕組み

#### JSXの変換
- JSX は HTML に似た構文で React コンポーネントを記述できるが、ブラウザはそのままでは理解できない。
- Babel（CDN経由で読み込む `babel-standalone`）が JSX を JavaScript に変換する。
- `<script type="text/babel">` によって、Babel がそのスクリプトブロック内のコードを変換対象として認識する。

#### 実行の流れ
1. **CDNでライブラリを読み込む**
   ```html
   <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
   <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
   <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
   ```
   - React本体、DOM操作用のReactDOM、そしてBabelを読み込む。

2. **JSXを含むスクリプトを記述**
   ```html
   <script type="text/babel">
     const App = () => {
       return (
         <div>
           hello
           <ChildComponent greeting='おはよう' />
         </div>
       );
     };

     const ChildComponent = ({ greeting }) => {
       return <h2>{greeting}</h2>;
     };

     const container = document.getElementById('root');
     const root = ReactDOM.createRoot(container);
     root.render(<App />);
   </script>
   ```
   - JSXでReactコンポーネントを定義し、DOMにレンダリングする。

---

### ⚠️ 注意点

- **開発用途向け**：`babel-standalone` は本番環境には向いていません。変換処理がブラウザ上で行われるため、パフォーマンスやセキュリティの観点からも避けるべきです。
- **構文エラーに注意**：JSXはHTMLに似ているが、JavaScriptの構文として扱われるため、閉じタグや属性の記述ミスに注意が必要です。

---

### 🛠️ まとめ

`<script type="text/babel">` は、React.js を CDN 経由で使う際に JSX を直接ブラウザで変換・実行するための仕組みです。Node.js や npm を使わずに、手軽に React の開発を始めたいときに便利ですが、あくまで学習やプロトタイプ向けの手法です。

---

## 📦 JSX を外部ファイルに分離する方法（CDN構成）

### 1. JSXファイルを作成する
たとえば、`app.jsx` というファイルを作成し、以下のように記述します：

```jsx
const ChildComponent = ({ greeting }) => {
  return <h2>{greeting}</h2>;
};

const App = () => {
  return (
    <div>
      hello
      <ChildComponent greeting="おはよう" />
    </div>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
```

### 2. HTMLから読み込む
HTML 側では Babel を使って JSX を変換するため、外部ファイルを `<script type="text/babel" src="app.jsx"></script>` のように読み込みます：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React CDN Example</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel" src="app.jsx"></script>
  </body>
</html>
```

---

### ⚠️ 注意点

- **ローカルで動かす場合**：`app.jsx` を読み込むには、ローカルサーバー（例：PythonのHTTPサーバーなど）を使う必要があります。ファイルを直接開く（`file://`）では読み込めません。
- **CORS制限**：外部ファイルを読み込む際、CORS（クロスオリジン）制限に注意してください。ローカルでの開発には `http-server` や `live-server` などが便利です。
- **本番環境では非推奨**：Babelによるブラウザ上での変換は開発用途向けです。本番では事前にビルドして JS に変換しておくのが一般的です。

---

### ✅ まとめ

JSX を外部ファイルに分離することは可能で、`<script type="text/babel" src="...">` を使えば HTML から読み込めます。ただし、ローカルサーバーの利用や開発用途に限定される点に注意が必要です。

Ionic Components を CDN で使う方法について、公式ドキュメントの内容をもとにわかりやすく解説します。

---

## 🚀 Ionic Components を CDN で使う方法

Ionic Framework は、CDN を使って **Angular・React・Vue などのフレームワークなしでも** HTML ページ上で直接使うことができます。これはプロトタイプやテスト環境に非常に便利です。

### ✅ 必要なCDNリンク

以下のコードを HTML の `<head>` に追加することで、Ionic のコアコンポーネントとスタイルを読み込めます：

```html
<!-- Ionic Core JS (ESMと非ESM両方) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>

<!-- Ionic CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
```

これだけで `<ion-button>` や `<ion-card>` などのコンポーネントが使えるようになります。

---

$## 🧪 使用例（Vanilla HTML）

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Ionic CDN Example</title>
    <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
  </head>
  <body>
    <ion-button expand="block" color="primary">Hello Ionic</ion-button>
  </body>
</html>
```

このように、フレームワークなしで Ionic コンポーネントを直接使えます。

---

### 📌 注意点

- **ローカルで動かす場合はサーバーが必要**：ESM モジュールは `file://` では動作しないため、`http-server` や `live-server` などのローカルサーバーを使ってください。
- **本番環境には不向き**：CDN構成は開発・テスト向けです。本番では npm を使ってビルドする方法が推奨されます。
- **Ioniconsも使える**：アイコンを使いたい場合は以下を `<body>` の最後に追加します：

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.js"></script>
```

---

### 🧩 Ionic + React/Vue/Angular との違い

CDN構成ではフレームワーク固有の機能（ルーティング、状態管理など）は使えません。より高度なアプリを作る場合は npm を使って `@ionic/react` や `@ionic/vue` を導入するのがベストです。

---

React に Ionic Components を CDN 経由で組み込む方法について、公式ドキュメントの内容と React の基本構成を踏まえて解説します。

---

## ⚙️ Ionic Components を React + CDN 構成に追加する方法

### ✅ 必要なCDNリンク（HTMLに追加）

React を CDN で使っている場合、以下の Ionic CDN を `<head>` に追加します：

```html
<!-- Ionic Core JS -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
<script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>

<!-- Ionic CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
```

これで `<ion-button>` や `<ion-card>` などの Web Components が使えるようになります。

---

### 🧪 React + Ionic の使用例（CDN構成）

React を CDN で使っている前提で、JSX 内に Ionic コンポーネントを組み込む例です：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React + Ionic CDN</title>
    <!-- React & Babel -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Ionic -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
  </head>
  <body>
    <div id="root"></div>

    <script type="text/babel">
      const App = () => {
        return (
          <div>
            <ion-button color="primary">Ionic Button</ion-button>
            <ion-card>
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
              </ion-card-header>
              <ion-card-content>This is Ionic content inside React!</ion-card-content>
            </ion-card>
          </div>
        );
      };

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    </script>
  </body>
</html>
```

---

### 📌 注意点

- Ionic の Web Components は **カスタム要素（Custom Elements）** なので、React から直接使えます。
- ただし、**イベントハンドリング（onClickなど）** や **状態管理** は React 側で行う必要があります。
- Ionic の一部機能（`ion-content` や `ion-page` など）は、モバイルライクな UI を構成するために使われます。必要に応じて追加してください。

---

### 🧩 Ionic React（npm構成）との違い

CDN構成では `@ionic/react` パッケージを使わないため、以下のような高度な機能は使えません：

| 機能                     | CDN構成 | npm構成（@ionic/react） |
|--------------------------|---------|--------------------------|
| JSXでの型補完            | ❌      | ✅                       |
| React Routerとの統合     | ❌      | ✅                       |
| Ionic専用のライフサイクル | ❌      | ✅                       |
| 仮想スクロール（Virtuoso）| ⚠️ 手動対応 | ✅ 統合済み              |

---

### 🧠 まとめ

React + CDN 構成でも Ionic の Web Components を使うことは可能です。簡単な UI を素早く構築したい場合に便利ですが、より複雑なアプリを作る場合は `@ionic/react` を使った npm 構成が推奨されます。

CDN構成で仮想スクロールを使いたい場合、残念ながら公式の推奨ライブラリである [Virtuoso](https://virtuoso.dev/) は **npm環境専用** であり、CDNでは直接利用できません。Ionic公式ドキュメントでも、`react-virtuoso` の使用には `npm install` が必要と明記されています[^1]。

---

## ❌ CDN構成での制約

| 機能 | CDN構成 | npm構成 |
|------|----------|----------|
| Virtuosoによる仮想スクロール | 利用不可 | 利用可能 |
| `ion-virtual-scroll`（旧機能） | 廃止済み | 廃止済み |
| 独自実装による仮想スクロール | ⚠️ 可能だが手動対応 | ✅ 可能 |

---

## 🛠️ CDN構成で仮想スクロールを実現する代替案

CDN構成で仮想スクロールを使いたい場合は、以下のような **手動実装** が必要です：

### 1. スクロール領域を制限し、表示アイテムを動的に切り替える

```html
<div id="scroll-container" style="height: 400px; overflow-y: auto;">
  <div id="visible-items"></div>
</div>

<script type="text/babel">
  const totalItems = 10000;
  const itemHeight = 40;
  const visibleCount = 20;

  const ScrollList = () => {
    const [startIndex, setStartIndex] = React.useState(0);

    React.useEffect(() => {
      const container = document.getElementById('scroll-container');
      container.addEventListener('scroll', () => {
        const scrollTop = container.scrollTop;
        const newStart = Math.floor(scrollTop / itemHeight);
        setStartIndex(newStart);
      });
    }, []);

    const items = [];
    for (let i = startIndex; i < startIndex + visibleCount; i++) {
      items.push(
        <ion-item key={i}>
          <ion-label>{`Item ${i}`}</ion-label>
        </ion-item>
      );
    }

    return <div style={{ height: totalItems * itemHeight + 'px' }}>{items}</div>;
  };

  ReactDOM.createRoot(document.getElementById('visible-items')).render(<ScrollList />);
</script>
```

> この方法は簡易的な仮想スクロールで、パフォーマンスやUXは Virtuoso に劣ります。

---

### ✅ 結論とおすすめ

- CDN構成では **Virtuosoは使えない**。
- 仮想スクロールを使いたいなら、**npm構成に移行するのが最も現実的**。
- どうしてもCDNでやりたい場合は、**手動でスクロールイベントを監視して表示アイテムを切り替える**必要があります。

---

[^1]: [Ionic公式ドキュメント - 仮想スクロール](https://ionicframework.com/docs/ja/react/virtual-scroll)

CDN構成で仮想スクロールを使う場合、スクリプトを HTML から分離するには、JSX を外部ファイルにして `<script type="text/babel" src="...">` で読み込む方法が使えます。ただし、Virtuoso のような高度な仮想スクロールライブラリは CDN では利用できないため、**手動で仮想スクロールを実装する**必要があります。

---

## 📁 スクリプトを分離する方法（CDN構成）

### 1. 外部ファイルを作成（例：`scroll-list.jsx`）

```jsx
const totalItems = 10000;
const itemHeight = 40;
const visibleCount = 20;

const ScrollList = () => {
  const [startIndex, setStartIndex] = React.useState(0);

  React.useEffect(() => {
    const container = document.getElementById('scroll-container');
    container.addEventListener('scroll', () => {
      const scrollTop = container.scrollTop;
      const newStart = Math.floor(scrollTop / itemHeight);
      setStartIndex(newStart);
    });
  }, []);

  const items = [];
  for (let i = startIndex; i < startIndex + visibleCount; i++) {
    items.push(
      <ion-item key={i}>
        <ion-label>{`Item ${i}`}</ion-label>
      </ion-item>
    );
  }

  return <div style={{ height: totalItems * itemHeight + 'px' }}>{items}</div>;
};

ReactDOM.createRoot(document.getElementById('visible-items')).render(<ScrollList />);
```

### 2. HTMLファイルで読み込む

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>CDN Virtual Scroll</title>
    <!-- React & Babel -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <!-- Ionic -->
    <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>
    <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />
  </head>
  <body>
    <div id="scroll-container" style="height: 400px; overflow-y: auto;">
      <div id="visible-items"></div>
    </div>

    <!-- JSXスクリプトの読み込み -->
    <script type="text/babel" src="scroll-list.jsx"></script>
  </body>
</html>
```

---

### ✅ ポイント

- JSXファイルは `.jsx` 拡張子で保存し、`type="text/babel"` で読み込む。
- ローカルで動かす場合は `http-server` や `live-server` などのローカルサーバーが必要。
- CDN構成では `react-virtuoso` は使えないため、スクロールイベントを使った手動実装が必要。

---
## 開発サーバーを実行する
1. `npm run dev`を実行して開発サーバーを起動します。
2. アプリケーションを表示するには、`http://localhost:3000` こちらにアクセスしてください。
3. ファイルを編集し`app/page.js`で保存すると、更新された結果がブラウザに表示されます。
