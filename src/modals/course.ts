import { Segment, segmentBeforeStored} from "../modals/segment";
import { Main, mainBeforeStored } from "./main";

export type Course = {
 main: Main[]
 segments: Segment[]
};

export type courseBeforeStored = {
 main: mainBeforeStored
 segments: segmentBeforeStored
}