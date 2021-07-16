prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350, 
    height:300, 
    image_format:"jpeg",
    jpeg_quality: 90
})

camera = document.getElementById("camera")

Webcam.attach("#camera")

function captureimage(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "CapturedImg" src = "'+ data_uri +'">'

    })

}
console.log("ml5version", ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/CCU6Y4kRL/model.json", modelLoaded)
function modelLoaded(){
    console.log("Model is Loaded!")
}
function speak(){
    var synth = window.speechSynthesis
    speak_data1 = "The first prediction is" + prediction_1
    speak_data2 = "and the second prediction is" + prediction_2
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2)
    synth.speak(utterThis)
}

function predict_gesture(){
    img = document.getElementById("CapturedImg")
    classifier.classify(img, gotResults)
}

function gotResults(error, results){
    if (error){
        console.error(error)

    }
    else{
        console.log(results)
        document.getElementById("result_gesture_name").innerHTML = results[0].label
        document.getElementById("result_gesture_name_2").innerHTML = results[1].label
        prediction_1 = results[0].label
        prediction_2 = results[1].label
        speak();
        if (results[0].label == "Best"){
            document.getElementById("Update_gesture").innerHTML = "👍"
            
        }
        if(results[0].label == "Victory"){
            document.getElementById("Update_gesture").innerHTML = "✌️"
        }
        if(results[0].label == "Amazing"){
            document.getElementById("Update_gesture").innerHTML = "👌"
        }
        if (results[1].label == "Best"){
            document.getElementById("Update_gesture_2").innerHTML = "👍"
            
        }
        if(results[1].label == "Victory"){
            document.getElementById("Update_gesture_2").innerHTML = "✌️"
        }
        if(results[1].label == "Amazing"){
            document.getElementById("Update_gesture_2").innerHTML = "👌"
        }
    }

}