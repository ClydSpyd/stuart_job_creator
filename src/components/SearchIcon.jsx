import React from 'react'
import pickupBlank from '../assets/pickupBadgeBlank.svg'
import pickupError from '../assets/pickupBadgeError.svg'
import pickupPresent from '../assets/pickupBadgePresent.svg'
import dropoffBlank from '../assets/dropoffBadgeBlank.svg'
import dropoffError from '../assets/dropoffBadgeError.svg'
import dropoffPresent from '../assets/dropoffBadgePresent.svg'
import loader from '../assets/loader_blue3.svg'

const icons = {
    pickup:{
        blank: pickupBlank,
        error: pickupError,
        present: pickupPresent,
        loading:loader
    },
    dropoff:{
        blank: dropoffBlank,
        error: dropoffError,
        present: dropoffPresent,
        loading:loader
    },
}

const SearchIcon = ({ type, status }) => {
    return <img className='icon' src={icons[type][status]} />
}

export default SearchIcon