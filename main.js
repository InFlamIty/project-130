scoreLeft = 0
scoreRight = 0
status1 = ""
song1 = ""
song2 = ""
rightWristX = 0
rightWristY = 0
leftWristX = 0
leftWristY = 0
status2 = ""
function setup()
{
    canvas = createCanvas(700 , 600)
    video = createCapture(VIDEO)
    video.hide()
    canvas.center()
    poseNet = ml5.poseNet(video , modelLoaded)
    poseNet.on("pose" , gotResults)
}
function draw()
{
    status1 = song1.isPlaying()
    image(video , 0 , 0 , 700 , 600)
    if (scoreLeft > 0.2) {
        stroke("green")
        fill("green")
        circle(leftWristX , leftWristY , 30)
        song2.stop()
        if (status1 == false) {
            song1.play()
            document.getElementById("songName").innerHTML = "song playing is the Harry Potter Theme music"
        }
    }
    status2 = song2.isPlaying()
    if (scoreRight > 0.2) {
        stroke("purple")
        fill("purple")
        circle(rightWristX , rightWristY , 20)
        song1.stop()
        if (status2 == false) {
            song2.play()
            document.getElementById("songName").innerHTML = "song playing is Peter Pan music"
        }
    }
}
function preload()
{
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}
function modelLoaded()
{
    console.log("yesssssssssssir, finally i think my code is working properly and not creating a goofy virus that will demolish your PC and share all ur personal information. i think......")
}
function gotResults(results)
{
    if (results.length > 0) {
        console.log(results)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("rightWristX = " + rightWristX , "rightWristY = " + rightWristY)
        console.log("leftWristX = " + leftWristX , "leftWristY = " + leftWristY)
        scoreLeft = results[0].pose.keypoints[9].score
        console.log("score left wrist = " + scoreLeft)
        scoreRight = results[0].pose.keypoints[10].score
        console.log("score right wrist = " + scoreRight)
    }
    
}