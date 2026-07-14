import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 구버전(Next.js 기본 설정)을 최신 ESLint 9 버전에 맞게 호환시켜주는 도구
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Next.js 공식 권장 규칙 적용 (보여주신 코드의 nextVitals, nextTs 역할)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. 전역 무시 설정 (보여주신 코드의 globalIgnores 역할)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // 필요하다면 여기에 무시할 파일이나 폴더를 더 추가하실 수 있습니다.
    ],
  },
];

export default eslintConfig;