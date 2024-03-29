/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Kkk3CsEEbLhELlWR","label":"Aetherion","bookmarks":[{"id":"99ljcRoGwEnR04eu","label":"a/github","url":"https://github.com/aetherionsa?tab=repositories"},{"id":"qkl8g84k5opEV4Mx","label":"a/gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"Y6JzOSofwZ8fhvpe","label":"a/discord","url":"https://discord.com/channels/@me"},{"id":"ITK0k4wmmuyf9OOY","label":"a/proton","url":"https://mail.proton.me/u/0/inbox"}]},{"id":"rrYijLVr48GQraQy","label":"Media","bookmarks":[{"id":"yY04BGpDmvmASMrb","label":"YouTube","url":"https://www.youtube.com/"},{"id":"wdkURcmzNYrJywQx","label":"Drive","url":"https://drive.google.com/drive/folders/0AAju9Ea_Puf4Uk9PVA"},{"id":"i1IQhg1lR5lqKyFe","label":"GPT","url":"https://chat.openai.com/"},{"id":"Bsa4jKbCErFePntJ","label":"Claude","url":"https://claude.ai/chats"}]},{"id":"YKyPChHoiowoZWON","label":"WorthReading","bookmarks":[{"id":"hK8n3oZWlGtBwoOe","label":"onehack","url":"https://onehack.us/"},{"id":"RYus2bvjlvfTGwAN","label":"medium","url":"https://medium.com/"},{"id":"QaIJRr6W4w5jdr4W","label":"reddit","url":"https://www.reddit.com/"}]},{"id":"MRILbZH0gJ45aIKU","label":"sources","bookmarks":[{"id":"HjcuLWw1pGQmorr8","label":"lottie","url":"https://lottiefiles.com/featured"},{"id":"ky7nGRx0tYMeGWrU","label":"icon","url":"https://www.flaticon.com/"},{"id":"Z0DK0bqZNm6wNRGa","label":"@startpage","url":"https://aetherionsa.github.io/startpage/"},{"id":"SSJbKbCUOpPIg8d1","label":"author","url":"https://github.com/aetherionsa"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
