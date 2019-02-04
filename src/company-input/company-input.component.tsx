import React from 'react'
import { Input } from 'reactstrap'
import clsx from 'clsx'
import { CompanyInputFetcher } from './company-input.fetcher'
import Downshift from 'downshift'

import styles from './company-input.module.scss'

export function CompanyInputComponent({ onChange }) {
  return (
    <Downshift onChange={onChange}>
      {({
          inputValue,
          getInputProps,
          getLabelProps,
          getMenuProps,
          getItemProps,
          // selectedItem,
          // highlightedIndex,
          isOpen,
          // clearSelection,
        }) => {
        return (
          <div style={{position: 'relative'}} className='mb-2 mr-sm-2'>
            <label {...getLabelProps()} hidden>Search for a company</label>
            <Input
              {...getInputProps({
                type: 'search',
                placeholder: 'Search',
                'aria-label': 'Search',
              }) as any}
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
                    <CompanyInputFetcher query={inputValue}>
                      {({loading, error, data = []}) => {
                        if (loading) {
                          return <div className={styles.item}>Loading...</div>
                        }

                        if (error) {
                          return <div className={styles.item}>Error! ${error}</div>
                        }

                        if (!data.length) {
                          return <div className={styles.item}>No companies found</div>
                        }

                        return data.map(({id, code, name}) => (
                          <div
                            key={id}
                            {...getItemProps({
                              item: code,
                              index: id,
                              // isActive: highlightedIndex === index,
                              // isSelected: selectedItem === item,
                              className: styles.item,
                              children: name
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
