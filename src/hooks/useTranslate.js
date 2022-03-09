import { useLocale } from '../context/LocaleContext'
const dict = {
  ko: {
    'confirm button': '확인',
    'cancel button': '취소',
    'edit button': '수정',
    'delete button': '삭제',
    'search button': '검색',
  },
  en: {
    'confirm button': 'OK',
    'cancel button': 'Cancel',
    'edit button': 'Edit',
    'delete button': 'Delete',
    'search button': 'Search',
  },
}

const useTranslate = () => {
  const local = useLocale()
  const translate = (key) => dict[local][key] || ''
  return translate
}

export default useTranslate
