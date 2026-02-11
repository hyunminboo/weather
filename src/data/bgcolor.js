import bg1 from "../assets/1.png"
import bg2 from "../assets/2.png"
import bg3 from "../assets/3.png"
import bg5 from "../assets/5.png"
import bg6 from "../assets/6.png"
import bg7 from "../assets/7.png"
import bg8 from "../assets/8.png"

export const getBgImageByWeatherId = (weatherId) => {
    if (weatherId === 800) return bg1

    const group = Math.floor(weatherId / 100)

    switch (group) {
        case 2:
            return bg2
        case 3:
            return bg3
        case 5:
            return bg5
        case 6:
            return bg6
        case 7:
            return bg7
        case 8:
            return bg8
        default:
            return bg1
    }
}