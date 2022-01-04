This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project setup : Nextjs+React-testing-library+TypeScript+Tailwind CSS

## 1. Nextjs Project 新規作成
### 1-1.  create-next-app
    npx create-next-app . --use-npm
#### Node.js version 10.13以降が必要です。 -> ターミナル `node -v`でver確認出来ます。
### 1-2.  必要 module のインストール
    npm i axios@0.21.1 msw@0.35.0 swr
### 1-3.  prettierの設定 : package.json
~~~
    "prettier": {
        "singleQuote": true,
        "semi": false
    }
~~~  

## 2. React-testing-library の導入

### 2-1.  必要 module のインストール  
    npm i -D jest @testing-library/react @types/jest @testing-library/jest-dom @testing-library/dom babel-jest @testing-library/user-event jest-css-modules
### 2-2.  Project folder 直下に".babelrc"ファイルを作成して下記設定を追加
    touch .babelrc
~~~
    {
        "presets": ["next/babel"]
    }
~~~
### 2-3.  package.json に jest の設定を追記
~~~
    "jest": {
        "testPathIgnorePatterns": [
            "<rootDir>/.next/",
            "<rootDir>/node_modules/"
        ],
        "moduleNameMapper": {
            "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
        }
    }
~~~
### 2-4.  package.jsonに test scriptを追記
~~~
    "scripts": {
        ...
        "test": "jest --env=jsdom --verbose"
    },
~~~

## 3. TypeScript の導入
https://nextjs.org/learn/excel/typescript/create-tsconfig
### 3-1. 空のtsconfig.json作成
    touch tsconfig.json
### 3-2. 必要moduleのインストール
    npm i -D typescript @types/react @types/node
### 3-3. 開発server起動
    npm run dev
### 3-4. _app.js, index.js -> tsx へ拡張子変更
### 3-5. AppProps型追記
~~~
    import { AppProps } from 'next/app'

    function MyApp({ Component, pageProps }: AppProps) {
        return <Component {...pageProps} />
    }

    export default MyApp
~~~

## 4. Tailwind CSS の導入
https://tailwindcss.com/docs/guides/nextjs
### 4-1. 必要moduleのインストール
    npm i tailwindcss@latest postcss@latest autoprefixer@latest
### 4-2. tailwind.config.js, postcss.config.jsの生成
    npx tailwindcss init -p
### 4-3. tailwind.config.jsのpurge設定追加
~~~
module.exports = {
    purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
~~~
### 4-4. globals.cssの編集
~~~
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~
## 5. 動作確認
### 5-1. index.tsxの編集
~~~
const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen font-mono">
      Hello Nextjs
    </div>
  )
}
export default Home
~~~
#### npm run dev -> Tailwind CSSが効いているかブラウザで確認
### 5-2. `__tests__`フォルダと`Home.test.tsx`ファイルの作成
~~~
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'

it('Should render hello text', () => {
  render(<Home />)
  expect(screen.getByText('Hello Nextjs')).toBeInTheDocument()
})
~~~
#### npm test -> テストがPASSするか確認
~~~
 PASS  __tests__/Home.test.tsx
  ✓ Should render hello text (20 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.728 s, estimated 2 s
~~~