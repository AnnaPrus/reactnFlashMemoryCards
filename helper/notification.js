import { Notifications, Permissions } from 'expo'
import React from 'react'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'Flashcard:notifications'
export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: 'Quizz!',
      body: "Give it a try!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export  function setLocalNotification () {
    
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then( async (data) => {
        if (data === null) {
          
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            
          
          if (status === 'granted') {
                
                Notifications.cancelAllScheduledNotificationsAsync()
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        }
        
      })
  }