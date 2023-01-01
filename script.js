
// const fetch = require('node-fetch');

(async () => {

    let posts = []
    let currentPage = 1;
    const NUMBER_PER_PAGE = 10;
    posts = await getPosts() //await works like then so it won't be promise
    const AMOUNT_OF_PAGES = Math.ceil(posts.length / NUMBER_PER_PAGE)
    let noOfPagesArr = new Array(AMOUNT_OF_PAGES).fill(0).map((_, index) => index + 1)
    console.log('no: ', noOfPagesArr)
    const navigator = document.getElementById('navigator-list')
    let leftArrow = document.getElementById('left-btn')
    let rightArrow = document.getElementById('right-btn')

    for (let i = 0; i < noOfPagesArr.length; i++) {
        const pageNumLi = document.createElement('li')
        const pageHyperlink = document.createElement('a')
        navigator.appendChild(pageNumLi);
        pageNumLi.appendChild(pageHyperlink);
        pageHyperlink.innerHTML = noOfPagesArr[i];
        // pageHyperlink.dataset.page = noOfPagesArr[i]

        pageHyperlink.addEventListener('click', () => {
            // const page = event.target.dataset.page;
            // console.log(page);
            currentPage = noOfPagesArr[i]
            fillWithPosts(currentPage);

        })
    }

    leftArrow.addEventListener('click', () => {
        currentPage--
        if (currentPage === 0) {
            currentPage = noOfPagesArr.length
            console.log(currentPage)
        }


        fillWithPosts(currentPage)
    })

    rightArrow.addEventListener('click', () => {
        currentPage++
        if (currentPage > noOfPagesArr.length) {
            currentPage = 1
        }


        fillWithPosts(currentPage)
    })

    async function getPosts() {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'GET',
            header: {
                'Content-type': 'application/json'
            }
        });
        if (res.ok) {
            const result = await res.json()
            console.log(result)
            return result
        } else {
            return []
        }
    }


    const fillWithPosts = (pageNo) => {
        pageNo = Number(pageNo)
        const startIndex = (pageNo - 1) * NUMBER_PER_PAGE
        const endIndex = Math.min((pageNo * NUMBER_PER_PAGE) - 1, posts.length - 1)
        const postCopy = [...posts]
        const postsCurrentPage = postCopy.splice(startIndex, (endIndex - startIndex) + 1)
        const list = document.getElementById('list')
        list.innerHTML = ''

        postsCurrentPage.forEach((post, index) => {
            const postLi = document.createElement('li')
            postLi.innerHTML = post.title
            list.appendChild(postLi)
        })
    }
    fillWithPosts(currentPage);
})().then()





// let page = 1
//     let h = setInterval(() => {
//         if (page === 11) {
//             clearInterval(h)
//             return
//         }
//         fillWithPageNo(page)
//         page++
//     }, 3000)
