const renderGift = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
    const response = await fetch('/creators')
    const data = await response.json()
    const giftContent = document.getElementById('gift-content')
    let gift
    if(data){
        gift = data.find(gift => gift.id === requestedID)
    }
    if (gift) {
        document.getElementById('image').src = gift.image_url
        document.getElementById('name').textContent = gift.name
        document.getElementById('description').textContent = gift.description

        const igLink = document.getElementById('ig')
        igLink.href = gift.instagram_url
        igLink.textContent = 'Instagram'

        // Set the YouTube link
        const ytLink = document.getElementById('youtube')
        ytLink.href = gift.youtube_url
        ytLink.textContent = 'YouTube'
        // document.getElementById('ig').href = 'Instagram: ' + gift.instagram_url
        // document.getElementById('youtube').textContent = 'Youtube: ' + gift.youtube_url
        // document.getElementById('description').textContent = gift.description
        // document.title = `UnEarthed - ${gift.name}`
      
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Gifts Available 😞'
        giftContent.appendChild(message)
          
    }

}

renderGift()