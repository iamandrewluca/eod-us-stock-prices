import React from 'react'
import Downshift from 'downshift'
import { Input } from 'reactstrap'
import clsx from 'clsx'

import CompanyInputFetcher from './company-input.fetcher'
import styles from './company-input.module.scss'

export class CompanyInputComponent extends React.Component {
  render() {
    return (
      <Downshift>
        {({
            inputValue,
            getInputProps,
            getLabelProps,
            getMenuProps,
            getItemProps,
            getToggleButtonProps,
            selectedItem,
            highlightedIndex,
            isOpen,
            clearSelection,
          }) => {
          return (
            <div style={{position: 'relative'}} className='mb-2 mr-sm-2'>
              <label {...getLabelProps()} hidden>Search for a company</label>
              <Input
                {...getInputProps({
                  type: 'search',
                  placeholder: 'Search',
                  'aria-label': 'Search',
                })}
              />
              {isOpen && (
                <div {...getMenuProps({className: clsx(styles.menu, 'shadow')})}>
                  {(() => {
                    if (!inputValue) {
                      return (
                        <div className={styles.item}>You have to enter a search query</div>
                      )
                    }

                    return (
                      <CompanyInputFetcher params={{q: inputValue}}>
                        {({loading, error, data = []}) => {
                          if (loading) {
                            return <div className={styles.item}>Loading...</div>
                          }

                          if (error) {
                            return <div className={styles.item}>Error! ${error}</div>
                          }

                          if (!data.length) {
                            return <div className={styles.item}>No repositories found</div>
                          }

                          return data.map(({id, code, name: item}, index) => (
                            <div
                              key={id}
                              {...getItemProps({
                                item,
                                index,
                                // isActive: highlightedIndex === index,
                                // isSelected: selectedItem === item,
                                className: styles.item,
                                children: item
                              })}
                            />
                          ))
                        }}
                      </CompanyInputFetcher>
                    )
                  })()}
                </div>
              )}
            </div>
          )
        }}
      </Downshift>
    )
  }
}
