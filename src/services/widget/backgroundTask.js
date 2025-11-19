import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendQuoteNotification } from './notificationManager';
import {getRandomQuote} from './quoteSelector';

const TASK_NAME = 'QUOTE_ROTATION_TASK';

TaskManager.defineTask(TASK_NAME, async () => {
    try{
        const settingsRaw = await AsyncStorage.getItem('widgetSettings');
        const settings = JSON.parse(settingsRaw || {});
        const quote = await getRandomQuote(settings);
        console.log("Notification settings:", settings);

        if (!quote) return BackgroundFetch.BackgroundFetchResult.NoData;

        await sendQuoteNotification(quote);
        return BackgroundFetch.BackgroundFetchResult.NewData;
    }catch (error) {
        console.log('Background fetch task error:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

export async function registerQuoteBackgroundTask(interval = 60) {/////////////////////////////////////////////////////////////////////////////////////////////

    try{
        const registered = await TaskManager.isTaskRegisteredAsync(TASK_NAME);
        if (!registered){
            console.log("TaskManager keys:", Object.keys(TaskManager));

            await TaskManager.registerTaskAsync(TASK_NAME);
            console.log("Task is registered:", TASK_NAME);
        }

        await BackgroundFetch.setMinimumIntervalAsync(interval);
        console.log(`Background quote task registered every ${interval / 60} min`);

        const status = await BackgroundFetch.getStatusAsync();
        if (status === BackgroundFetch.BackgroundFetchStatus.Restricted){
            console.warn("Background fetch setting is restricted by system setting.")
        }else if (status === BackgroundFetch.BackgroundFetchStatus.Denied){
            console.warn(" Background fetch is is denied");
        
        }else {
            console.log("Background fetch is active and ready.")
        }
    }catch (error){
        console.log('Failed to register Background task:', error)
    }

}