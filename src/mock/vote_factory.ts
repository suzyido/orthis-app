import { Vote } from '../models/vote';
import { VoteType } from '../enums/vote_type_enum';

export class VoteFactory {
    private static pictures: string[] = [
        "assets/imgs/car1.jpeg", 
        "assets/imgs/car2.jpeg",
        "assets/imgs/car3.jpeg",
        "assets/imgs/car4.jpeg",
        "assets/imgs/car5.jpeg",
        "assets/imgs/car6.jpeg",
        "assets/imgs/car7.jpeg"];

    private static texts: string[] = [
        "Red car is this really the car you want", 
        "Blue car is very nice during the cold winter",
        "Bibi Netaniaoo is the worst one to be there",
        "Two aggs with fries",
        "מרצדס או יגואר",
        "חולצה כחולה או חולצה ירוקה",
        "ביבי או לא ביבי זאת השאלה"];

    private static voteTitles: string[] = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "My Car", 
        "The car I want to buy",
        "Selling this one",
        "Look at that!",
        "Wow...",
        "Nice wheels :)",
        "Kind of oldy..."];

    static getNewVote(type: VoteType,
                      title: string,
                      data: string,
                      percentage: number): Vote {
        type = this.getType(type);
        if(type == VoteType.Picture) {
            return new Vote(VoteType.Picture,
                            this.getTitle(title),
                            this.getPictureData(data),
                            this.getPercentage(percentage));
        }
        else if(type == VoteType.Text) {
            return new Vote(VoteType.Text,
                            this.getTitle(title),
                            this.getTextData(data),
                            this.getPercentage(percentage));
        }
        return null;
    }
    private static getType(type: VoteType): VoteType {
        if(type == null) {
            let index = Math.floor((Math.random() * 2) + 1);
            return index == 1 ? VoteType.Picture : VoteType.Text;
        }
        return type;
    }

    private static getTitle(title: string) {
        if(title == null) {
            let index: number = Math.floor(Math.random() * this.voteTitles.length);
            return this.voteTitles[index];
        }
        return title;
    }

    private static getPictureData(data: string) {
        if(data == null) {
            let index: number = Math.floor(Math.random() * this.pictures.length);
            return this.pictures[index];
        }
        return data;
    }

    private static getTextData(data: string) {
        if(data == null) {
            let index: number = Math.floor(Math.random() * this.texts.length);
            return this.texts[index];
        }
        return data;
    }

    private static getPercentage(percentage: number) {
        if(percentage == null) {
            return Math.floor((Math.random() * 100) + 1);
        }
        return percentage;
    }    
}