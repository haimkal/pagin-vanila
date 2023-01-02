

$(document).ready(function () {
    (async () => {
        let posts = []
        let currentPage = 1
        let previousPage = 1
        const NUMBER_PER_PAGE = 10;
        posts = await getPosts() //await works like then so it won't be promise
        const AMOUNT_OF_PAGES = Math.ceil(posts.length / NUMBER_PER_PAGE)
        let noOfPagesArr = new Array(AMOUNT_OF_PAGES).fill(0).map((_, index) => index + 1)
        const navigator = $("#navigator-list")
        let leftArrow = $(".left-btn")
        let rightArrow = $(".right-btn")


        if (posts.length > 1) {
            leftArrow.addClass('shown')
            rightArrow.addClass('shown')
        }


        for (let i = 0; i < noOfPagesArr.length; i++) {
            const pageNumLi = $("<li></li>")
            const pageHyperlink = $("<a></a>")
            navigator.append(pageNumLi);
            pageNumLi.append(pageHyperlink);
            pageHyperlink.html(noOfPagesArr[i]);
            // pageHyperlink.attr('page', noOfPagesArr[i])
            pageHyperlink.click(() => {
                // const page = event.target.dataset.page;
                // console.log(page);
                // pageHyperlink.addClass('active')
                previousPage = currentPage
                currentPage = noOfPagesArr[i]
                highlightCurrentPage(previousPage, currentPage)
                fillWithPosts(currentPage);
            })
        }


        leftArrow.click(() => {
            previousPage = currentPage
            currentPage--
            if (currentPage === 0) {
                previousPage = currentPage + 1
                currentPage = noOfPagesArr.length
                console.log(currentPage)
            }
            highlightCurrentPage(previousPage, currentPage)
            fillWithPosts(currentPage)
        })

        rightArrow.click(() => {
            previousPage = currentPage
            currentPage++
            if (currentPage > noOfPagesArr.length) {
                previousPage = noOfPagesArr.length
                currentPage = 1
            }

            highlightCurrentPage(previousPage, currentPage)
            fillWithPosts(currentPage)
        })

        async function getPosts() {
            const res = await $.ajax({
                url: 'https://jsonplaceholder.typicode.com/posts',
                method: 'GET',
                header: {
                    'Content-type': 'application/json'
                }
            });
            console.log('res!: ', res)
            if (res) {
                console.log('here i am once again yo')

                return [res].flat()
            } else {
                return []
            }
        }

        const highlightCurrentPage = (p, i) => {
            $('a').eq(p - 1).removeClass('active')
            $('a').eq(i - 1).addClass('active')
        }
        highlightCurrentPage(previousPage, currentPage)

        const fillWithPosts = (pageNo) => {
            const startIndex = (pageNo - 1) * NUMBER_PER_PAGE
            const endIndex = Math.min((pageNo * NUMBER_PER_PAGE) - 1, posts.length - 1)
            const postCopy = [...posts]
            const postsCurrentPage = postCopy.splice(startIndex, (endIndex - startIndex) + 1)
            const list = $('#list')
            list.html("")

            postsCurrentPage.forEach((post, index) => {
                const postLi = $("<li></li>")
                postLi.html(post.title)
                list.append(postLi)
            })
        }

        fillWithPosts(currentPage);
    })().then()
})





// let page = 1
//     let h = setInterval(() => {
//         if (page === 11) {
//             clearInterval(h)
//             return
//         }
//         fillWithPageNo(page)
//         page++
//     }, 3000)
