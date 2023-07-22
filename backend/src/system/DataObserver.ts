import { createMetrics as createMetricsRepository } from "../database/repositories/metricRepository";
import { getOnlyUser as getOnlyUserRepository } from "../database/repositories/userRepository";

export default class DateObserver {
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
    }
  
    async onDateChange(newDate: Date) {

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        const users = await getOnlyUserRepository();
        const date = `${year}-${month}-${day}`;

        for (const user of users) {

            await createMetricsRepository(user.getDataValue("id"), 0, 0, 0, date);
        }
        
        createMetricsRepository
    }
  
    startObserving() {
      setInterval(() => {
        this.checkDateChange();
      }, 1000); 
    }
  }
