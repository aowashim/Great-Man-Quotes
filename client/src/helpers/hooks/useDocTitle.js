const useDocTitle = () => {
  const changeTitle = title => {
    document.title = title
  }

  return changeTitle
}

export default useDocTitle
