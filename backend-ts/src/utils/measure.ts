import MongoDB from "../db/mongo";

interface MeasureSaveProps {
  table: string;
  params: any;
}

class Measure {
  private static instance: Measure;
  private startTime: number = 0;
  private endTime: number = 0;
  private requestTime: number = 0;

  private constructor() {}

  static getInstance(): Measure {
    if (!Measure.instance) {
      Measure.instance = new Measure();
    }
    return Measure.instance;
  }

  public async start() {
    this.startTime = Date.now();
    return this;
  }

  public async end() {
    this.endTime = Date.now();
    this.requestTime = this.endTime - this.startTime;
    return this;
  }

  public async save({ table, params }: MeasureSaveProps) {
    try {
      MongoDB.getInstance().add(table, { ...params, time: this.requestTime });
    } catch (error) {
      console.log(error);
      throw new Error("Error on saving measure");
    }
    return this;
  }

  //   public async average() {
  //     try {
  //       const average = await MongoDB.getInstance().getAverageTime();
  //       console.log("Average", average);
  //     } catch (error) {
  //       console.log(error);
  //       throw new Error("Error on saving measure");
  //     }
  //   }
}

export default Measure;
