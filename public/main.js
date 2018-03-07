var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const line1 = this.parentNode.parentNode.childNodes[3].innerText
        const line2 = this.parentNode.parentNode.childNodes[5].innerText
        const line3 = this.parentNode.parentNode.childNodes[7].innerText
        const line4 = this.parentNode.parentNode.childNodes[9].innerText
        const line5 = this.parentNode.parentNode.childNodes[11].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[13].innerText)
        fetch('thumbUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'line1': line1,
            'line2': line2,
            'line3': line3,
            'line4': line4,
            'line5': line5,
            'thumbUp':thumbUp,
            'thumbDown':thumbDown
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const line1 = this.parentNode.parentNode.childNodes[3].innerText
        const line2 = this.parentNode.parentNode.childNodes[5].innerText
        const line3 = this.parentNode.parentNode.childNodes[7].innerText
        const line4 = this.parentNode.parentNode.childNodes[9].innerText
        const line5 = this.parentNode.parentNode.childNodes[11].innerText
        const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[13].innerText)
        fetch('thumbDown', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'line1': line1,
            'line2': line2,
            'line3': line3,
            'line4': line4,
            'line5': line5,
            'thumbUp':thumbUp,
            'thumbDown':thumbDown
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true) //page reload (another get request is triggered)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const line1 = this.parentNode.parentNode.childNodes[3].innerText
        const line2 = this.parentNode.parentNode.childNodes[5].innerText
        const line3 = this.parentNode.parentNode.childNodes[7].innerText
        const line4 = this.parentNode.parentNode.childNodes[9].innerText
        const line5 = this.parentNode.parentNode.childNodes[11].innerText
        fetch('lyrics', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'line1': line1,
            'line2': line2,
            'line3': line3,
            'line4': line4,
            'line5': line5
          })
        }).then(function (response) {
           window.location.reload()
        })
      });
});
