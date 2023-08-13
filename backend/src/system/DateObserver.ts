import MetricRepository from "../database/repositories/MetricRepository";
import UserServices from "../services/UserServices";

class DateObserver {
  private previousDate: number = new Date().getDate();

  constructor() {
    this.startObserving();
  }

  checkDateChange() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    if (currentDay !== this.previousDate) {
      this.onDateChange(currentDate);
      this.previousDate = currentDay;
    }
    // this.onDateChange(currentDate);
    // this.previousDate = currentDay;
  }

  async onDateChange(newDate: Date) {
    // const year = newDate.getFullYear();
    // const month = String(newDate.getMonth() + 1).padStart(2, "0");
    // const day = String(newDate.getDate()).padStart(2, "0");
    // const date = `${year}-${month}-${day}`;

    const users = await UserServices.getOnlyUsers();

    for (const user of users) {
      await MetricRepository.createMetrics(
        user.getDataValue("id"),
        0,
        0,
        0,
        newDate
          .toDateString(),
      );
    }
    console.log("mudei");
  }

  startObserving() {
    setInterval(() => {
      this.checkDateChange();
    }, 1000);
  }
}
export { DateObserver };
