import * as myHelpers from '../myHelpers'
import { days } from '../../lib/enumerables'

describe('myHelpers', () => {
  const dbDrinks = [
    {
      drink: ['Mimosa', 'Bloody Mary'],
      includes: 'Drink Only',
      price: 20
    },
    {
      drink: ['Bloody Mary'],
      includes: 'Drink Only',
      price: 25,
      remarks: 'with Absolute Vodka'
    },
    {
      drink: ['Mimosa'],
      includes: 'Drink + Full Course Meal',
      price: 28
    }
  ]
  const cleansedDrinks = [
    {
      drink: 'Mimosa',
      includes: 'Drink Only',
      price: 20
    },
    {
      drink: 'Bloody Mary',
      includes: 'Drink Only',
      price: 20
    },
    {
      drink: 'Bloody Mary',
      includes: 'Drink Only',
      price: 25,
      remarks: 'with Absolute Vodka'
    },
    {
      drink: 'Mimosa',
      includes: 'Drink + Full Course Meal',
      price: 28
    }
  ]
  const sortedDrinks = [
    {
      title: 'Bottomless Drinks',
      items: [
        {
          drink: 'Mimosa',
          includes: 'Drink Only',
          price: 20
        },
        {
          drink: 'Bloody Mary',
          includes: 'Drink Only',
          price: 20
        },
        {
          drink: 'Bloody Mary',
          includes: 'Drink Only',
          price: 25,
          remarks: 'with Absolute Vodka'
        }
      ]
    },
    {
      title: 'Bottomless Drinks + Prix Fixe',
      items: [
        {
          drink: 'Mimosa',
          includes: 'Drink + Full Course Meal',
          price: 28
        }
      ]
    }
  ]

  it('should extrapolate drinks', () => {
    expect(myHelpers.extrapolateDrinks(dbDrinks)).toEqual(cleansedDrinks)
  })
  it('should Extrapolate Includes', () => {
    expect(
      myHelpers.extrapolateIncludes(cleansedDrinks)
    ).toEqual(sortedDrinks)
  })

  it('should convert string time to an floatString', () => {
    expect(myHelpers.stringTimeToNumber('10:00AM')).toEqual(10)
    expect(myHelpers.stringTimeToNumber('8:30PM')).toEqual(20.5)
    expect(myHelpers.stringTimeToNumber('12:00AM')).toEqual(0)
    expect(myHelpers.stringTimeToNumber('12:30AM')).toEqual(0.5)
    expect(myHelpers.stringTimeToNumber('12:00PM')).toEqual(12)
    expect(myHelpers.stringTimeToNumber('12:30PM')).toEqual(12.5)
  })

  it('should convert a day into an int string', () => {
    expect(myHelpers.stringDayToInt('Monday', days)).toEqual(0)
    expect(myHelpers.stringDayToInt('tues', days)).toEqual(1)
    expect(myHelpers.stringDayToInt('saturday', days)).toEqual(5)
    expect(myHelpers.stringDayToInt('we', days)).toEqual(2)
  })

  it('should extrapolate times', () => {
    const start = [
      {
        category: 'Bottomless Brunch',
        days: ['Friday'],
        startTime: '11:00AM',
        endTime: '2:00PM',
        _id: '59ef1a671ae6c21f0aea65d2'
      },
      {
        category: 'Bottomless Brunch',
        days: ['Saturday', 'Sunday'],
        startTime: '10:30AM',
        endTime: '4:00PM',
        _id: '59ef1ac81ae6c21f0aea65d5'
      }
    ]
    const end = [
      {
        category: 'Bottomless Brunch',
        day: 4,
        startTime: 11,
        endTime: 14
      },
      {
        category: 'Bottomless Brunch',
        day: 5,
        startTime: 10.5,
        endTime: 16
      },
      {
        category: 'Bottomless Brunch',
        day: 6,
        startTime: 10.5,
        endTime: 16
      }
    ]
    expect(myHelpers.extrapolateTimes(start, days)).toEqual(end)
  })
})
