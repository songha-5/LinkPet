export const AGE_OPTIONS = [
  { value: "1", label: "1 세 (1_YEAR_OLD)" },
  { value: "2", label: "2 세 (2_YEAR_OLD)" },
  { value: "3", label: "3 세 (3_YEAR_OLD)" },
  { value: "4", label: "4 세 (4_YEAR_OLD)" },
  { value: "5", label: "5 세 (5_YEAR_OLD)" },
  { value: "6", label: "6 세 (6_YEAR_OLD)" },
  { value: "7", label: "7 세 (7_YEAR_OLD)" }
]

export const CHECK_SKIN = [
  { "id": "check-skin-1", "label": "피부를 자주 긁거나 핥아요", "option": "피부_가려움", "score": -5, "category": "skin" },
  { "id": "check-skin-2", "label": "뾰루지, 각질, 붉은 기가 있어요", "option": "피부_발진", "score": -10, "category": "skin" },
  { "id": "check-skin-3", "label": "귀지가 많고 냄새가 나요", "option": "귀_염증의심", "score": -5, "category": "skin" },
]

export const CHECK_MOUTH = [
  { "id": "check-mouth-1", "label": "사료를 잘 씹지 못하거나 입냄새가 심해요", "option": "구강_불편", "score": -5, "category": "mouth" },
  { "id": "check-mouth-2", "label": "구토를 하거나 변 상태가 묽어요", "option": "소화기_이상", "score": -10, "category": "mouth" },
]

export const CHECK_ACTIVITY = [
  { "id": "check-activity-1", "label": "걷는 모습이 불편해 보이거나 다리를 절어요", "option": "관절_통증", "score": -10, "category": "activity" },
  { "id": "check-activity-2", "label": "예전보다 활동량이 눈에 띄게 줄었어요", "option": "기력_저하", "score": -5, "category": "activity" },
]

export const CHECK_ETC = [
  { "id": "check-etc-1", "label": "기침을 자주 하거나 숨쉬기 힘들어해요", "option": "호흡기_이상", "score": -10, "category": "etc" },
  { "id": "check-etc-2", "label": "눈곱이 심하게 끼거나 눈이 충혈됐어요", "option": "안구_질환", "score": -5, "category": "etc" },
]

export const CHECK_SNACK = [
  { "id": "check-snack-1", "label": "거의 안 먹음", "option": "간식_적당", "score": 5, "category": "snack" },
  { "id": "check-snack-2", "label": "하루 1회", "option": "간식_평균", "score": 0, "category": "snack" },
  { "id": "check-snack-3", "label": "하루 2회 이상", "option": "간식_자제", "score": -5, "category": "snack" },
]

export const CHECK_OUTING = [
  { "id": "check-outing-1", "label": "예", "option": "외부감염_주의", "score": -5, "category": "outing" },
  { "id": "check-outing-2", "label": "아니요", "option": "외부감염_걱정없음", "score": 0, "category": "outing" },
]

// 점수를 뽑기위해 항목을 하나로 묶음
export const ALL_CHECKUP_ITEMS = [...CHECK_SKIN, ...CHECK_MOUTH, ...CHECK_ACTIVITY, ...CHECK_ETC, ...CHECK_SNACK, ...CHECK_OUTING]