import { PostgrestError } from "@supabase/postgrest-js";
import { AuthError } from "@supabase/supabase-js";

export function getErrorMessage(error: AuthError | PostgrestError | null | undefined): string {
  if (!error || !error.message) {
    return "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.";
  }

  switch (error.message) {
    //  로그인 에러
    case "Invalid login credentials":
      return "이메일 또는 비밀번호가 올바르지 않습니다."
      
    case "Email not confirmed":
      return "이메일 인증이 완료되지 않았습니다. 메일함을 확인해 주세요."

    // 회원가입 에러
    case "User already registered":
      return "이미 가입되어 있는 이메일입니다."
      
    case "Signup requires a valid password":
      return "유효한 비밀번호를 입력해 주세요."
      
    case "Unable to validate email address: invalid format":
    case "Invalid email":
      return "올바른 이메일 형식이 아닙니다."
      
    case "Signups not allowed for this instance":
      return "현재 관리자에 의해 회원가입이 제한되어 있습니다."

    // 비밀번호 재설정
    case "Password should be at least 6 characters":
      return "비밀번호는 최소 6자 이상이어야 합니다."
      
    case "New password should be different from the old password.":
      return "새 비밀번호는 기존 비밀번호와 달라야 합니다."
      
    case "Token has expired or is invalid":
      return "인증 링크가 만료되었거나 유효하지 않습니다. 링크를 다시 요청해 주세요."
      
    case "Auth session missing!":
      return "로그인 세션이 만료되었습니다. 다시 로그인한 후 변경해 주세요."
      
    case "User not found":
      return "해당 이메일로 가입된 계정을 찾을 수 없습니다."
      
    case "For security purposes, you can only request this once every 60 seconds":
      return "보안을 위해 60초 후에 다시 이메일을 요청할 수 있습니다."
    
    case "duplicate key value violates unique constraint \"users_username_key\"": // DB 제약 조건 이름에 따라 다를 수 있음
      return "이미 사용 중인 별명입니다. 다른 별명을 입력해 주세요.";

    case "database connection error":
      return "데이터베이스 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.";
      
    case "Permission denied for relation users":
    case "row-level security policy violation":
      return "변경 권한이 없습니다. 다시 로그인해 주세요.";
    
    // QnA 글 등록
    case "Invalid input: expected string, received undefined":
      return "글을 입력해주세요.";
    
    case `"invalid input syntax for type integer: "05f85311-2295-4100-a437-6312d624b525"`:
      return "오류가 발생했습니다. 다시 시도해주세요."
    
    default:
      console.error("처리되지 않은 Auth 에러:", error.message)
      return `인증 오류가 발생했습니다: ${error.message}`
  }
}