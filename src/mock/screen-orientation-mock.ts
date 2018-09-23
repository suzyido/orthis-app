import { ScreenOrientation } from "@ionic-native/screen-orientation";

export class ScreenOrientationMock extends ScreenOrientation {
     screenOrientation: ScreenOrientation = new ScreenOrientation();

    getCurrentScreenOrientation(): string {
        console.log('In getCurrentScreenOrientation');
        return this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY;
    }
    
    isLandscape(): boolean {
    return false;
    }
    isPortrait(): boolean {
    return true;
    }
    
}