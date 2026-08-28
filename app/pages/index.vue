<template>
  <header class="b-header js-header m-loaded" data-cmp="header">
    <div class="b-header__wrap js-header__wrap">
      <div class="b-header__top">
        <div class="b-header__overlay js-header__overlay"></div>
        <NuxtLink to="/" class="b-header__logo-link" title="Graff Home">
          <img
            class="js-header__logo b-header__logo"
            src="/assets/img/logo.svg"
            alt="Graff Home"
            aria-label="Graff Home"
            loading="lazy"
          />
        </NuxtLink>
        <div class="b-header__top-menu-slot">
          <div
            class="b-search-container b-search-overlay-wrapper js-search-overlay-wrapper"
          >
            <div class="b-site-search-wrapper js-site-search-wrapper">
              <div
                class="b-site-search js-site-search b-search-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="searchModalTitle"
                aria-hidden="true"
                tabindex="-1"
              >
                <h2 id="searchModalTitle" class="h-visually-hidden">Search</h2>

                <NuxtLink
                  class="b-search-modal__logo"
                  href="/"
                  aria-label="Home"
                >
                  <img
                    src="/assets/img/logo.svg"
                    alt="Graff"
                    class="b-search-modal__logo-image"
                  />
                </NuxtLink>

                <button
                  type="button"
                  class="b-site-search__close b-search-modal__close b-icon b-icon--close js-site-search__close"
                  aria-label="Close"
                ></button>

                <div class="b-search-modal__layout">
                  <div
                    class="b-content-asset content-asset"
                    data-content-id="search-modal-sidebar"
                  >
                    <nav
                      class="b-search-modal__sidebar js-search-modal__sidebar"
                      aria-label="Sidebar"
                      style="padding-top: 80px"
                    >
                      <div class="b-search-modal__sidebar-group">
                        <h3 class="b-search-modal__sidebar-title">
                          Client Services
                        </h3>
                        <ul class="b-search-modal__sidebar-list">
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >FAQs</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >Delivery &amp; Returns</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >Ring Size Guide</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >Privacy Policy</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >Terms &amp; Conditions</NuxtLink
                            >
                          </li>
                        </ul>
                      </div>
                      <div class="b-search-modal__sidebar-group">
                        <h3 class="b-search-modal__sidebar-title">
                          Connect with Us
                        </h3>
                        <ul class="b-search-modal__sidebar-list">
                          <li>
                            <NuxtLink
                              to="/"
                              class="h-hidden__d b-search-modal__sidebar-link"
                              >Telephone</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="h-hidden__d b-search-modal__sidebar-link"
                              >Whatsapp</NuxtLink
                            >
                          </li>

                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >Email</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >Book an Appointment</NuxtLink
                            >
                          </li>
                        </ul>
                      </div>
                      <div class="b-search-modal__sidebar-group">
                        <h3 class="b-search-modal__sidebar-title">
                          Visit a Boutique
                        </h3>
                        <ul class="b-search-modal__sidebar-list">
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >New Doha, Katara</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                            >
                              Riyadh, Olaya</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                            >
                              Auckland, Queen Street</NuxtLink
                            >
                          </li>
                          <li>
                            <NuxtLink
                              to="/"
                              class="b-search-modal__sidebar-link"
                              >View All Boutiques</NuxtLink
                            >
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              <div
                class="b-search-overlay js-search-overlay js-site-search__close"
              ></div>
            </div>
          </div>

          <nav
            class="b-header-menu js-header-menu"
            aria-label="Main Navigation"
          >
            <ul class="b-header-menu__list js-header-menu-list">
              <div class="b-header-backbutton h-hidden__d h-hidden">
                <div class="b-header-backbutton-holder js-backbutton">
                  <span
                    class="b-icon b-icon--chevron-left back-icon"
                    aria-hidden="true"
                  ></span>
                  <span
                    class="js-backbutton-text"
                    data-default-text="Overview"
                  ></span>
                </div>
              </div>

              <li
                class="b-header-menu__item m-has-subcategories js-has-subcategories"
                data-category-id="highjewellery"
              >
                <NuxtLink
                  to="/"
                  class="b-header-menu__link js-header-menu__link"
                  aria-haspopup="true"
                  style="animation-delay: 0s"
                >
                  <span class="b-header-menu__link-text">High Jewellery</span>
                  <span
                    class="b-icon b-icon--chevron-right"
                    aria-hidden="true"
                  ></span>
                </NuxtLink>

                <div class="b-header-dropdownmenu js-header-submenu">
                  <div class="b-header-dropdownmenu__inner">
                    <div class="b-header-submenu js-header-submenu">
                      <ul
                        class="b-header-submenu__list b-header-dropdownmenu__list"
                        role="menu"
                      >
                        <div class="l-grid__row l-grid__row--center h-mx--0">
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item h-hidden__d"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-high-jewellery__featured-banner"
                            >
                              <!-- dwMarker="content" dwContentID="2ad90155f617e72741ba3946d4" -->
                              <div class="b-megamenu-banner">
                                <div class="b-megamenu-banner__image-holder">
                                  <img
                                    alt="Temp Alt"
                                    class="b-megamenu-banner__image hidden"
                                    loading="lazy"
                                    src="/assets/img/Navigation_MM_High_Jewellery_2026_Update_1890x1059px.jpg"
                                  />
                                </div>

                                <div class="b-megamenu-banner__content">
                                  <div class="b-megamenu-banner__title">
                                    THE MOST FABULOUS JEWELS IN THE WORLD
                                  </div>

                                  <div
                                    class="b-megamenu-banner__content-markup"
                                  >
                                    <span style="desktop-font-size: 13px"
                                      >Discover exemplary high jewellery
                                      creations thoughtfully designed and
                                      expertly crafted by Graff’s master
                                      artisans.
                                    </span>
                                  </div>

                                  <div class="b-megamenu-banner__cta-holder">
                                    <NuxtLink
                                      to="/support"
                                      class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                      style="animation-delay: 0s"
                                      >Discover
                                    </NuxtLink>
                                  </div>
                                  <br />
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item"
                          >
                            <li
                              class="b-header-submenu__item b-header-submenu__item-full b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                              data-category-id="unique_jewels"
                              role="menuitem"
                            >
                              <NuxtLink
                                to="/"
                                class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link b-no-link js-no-link"
                                data-category-id="unique_jewels"
                                style="animation-delay: 0.02s"
                              >
                                <span>Unique Jewels</span>
                                <span
                                  class="b-icon b-icon--chevron-right"
                                  aria-hidden="true"
                                ></span>
                              </NuxtLink>

                              <div class="b-header-submenu js-header-submenu">
                                <ul class="b-header-submenu__list">
                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="unique_jewels_uniquetimepieces"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="unique_jewels_uniquetimepieces"
                                      style="animation-delay: 0s"
                                      >Unique Timepieces</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="unique_jewels_uniquesolitaires"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="unique_jewels_uniquesolitaires"
                                      style="animation-delay: 0.02s"
                                      >Unique Solitaires</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="unique_jewels_uniquecreations"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="unique_jewels_uniquecreations"
                                      style="animation-delay: 0.04s"
                                      >Unique Creations</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="unique_jewels_butterfly_brooches"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="unique_jewels_butterfly_brooches"
                                      style="animation-delay: 0.06s"
                                      >Artistry in Motion</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </div>
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item"
                          >
                            <li
                              class="b-header-submenu__item b-header-submenu__item-full b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                              data-category-id="highjewellery_explorebygems"
                              role="menuitem"
                            >
                              <NuxtLink
                                to="/"
                                class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link b-no-link js-no-link"
                                data-category-id="highjewellery_explorebygems"
                                style="animation-delay: 0.04s"
                              >
                                <span>Explore By Gems</span>
                                <span
                                  class="b-icon b-icon--chevron-right"
                                  aria-hidden="true"
                                ></span>
                              </NuxtLink>

                              <div class="b-header-submenu js-header-submenu">
                                <ul class="b-header-submenu__list">
                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_explorebygems_whitediamonds"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_explorebygems_whitediamonds"
                                      style="animation-delay: 0s"
                                      >White Diamonds</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_explorebygems_yellowdiamonds"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_explorebygems_yellowdiamonds"
                                      style="animation-delay: 0.02s"
                                      >Yellow Diamonds</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_explorebygems_emeralds"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_explorebygems_emeralds"
                                      style="animation-delay: 0.04s"
                                      >Emeralds</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_explorebygems_rubies"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_explorebygems_rubies"
                                      style="animation-delay: 0.06s"
                                      >Rubies</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_explorebygems_sapphires"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_explorebygems_sapphires"
                                      style="animation-delay: 0.08s"
                                      >Sapphires</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_explorebygems_rarefancycoloureddiamonds"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_explorebygems_rarefancycoloureddiamonds"
                                      style="animation-delay: 0.1s"
                                      >Rare Fancy Coloured Diamonds</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </div>
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item"
                          >
                            <li
                              class="b-header-submenu__item b-header-submenu__item-full b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                              data-category-id="highjewellery_famous_diamonds"
                              role="menuitem"
                            >
                              <NuxtLink
                                to="/"
                                class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link b-no-link js-no-link"
                                data-category-id="highjewellery_famous_diamonds"
                                style="animation-delay: 0.06s"
                              >
                                <span>Famous Diamonds</span>
                                <span
                                  class="b-icon b-icon--chevron-right"
                                  aria-hidden="true"
                                ></span>
                              </NuxtLink>

                              <div class="b-header-submenu js-header-submenu">
                                <ul class="b-header-submenu__list">
                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_famous_diamonds_infinity_diamond"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_famous_diamonds_infinity_diamond"
                                      style="animation-delay: 0s"
                                      >Graff Infinity Diamond</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_famous_diamonds_lesedi_la_rona"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_famous_diamonds_lesedi_la_rona"
                                      style="animation-delay: 0.02s"
                                      >Graff Lesedi La Rona</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_famous_diamonds_eternal_twins"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_famous_diamonds_eternal_twins"
                                      style="animation-delay: 0.04s"
                                      >Eternal Twins</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_famous_diamonds_graff_venus"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_famous_diamonds_graff_venus"
                                      style="animation-delay: 0.06s"
                                      >Graff Venus</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_famous_diamonds_graff_vendome"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_famous_diamonds_graff_vendome"
                                      style="animation-delay: 0.08s"
                                      >Graff Vendôme</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_famous_diamonds_golden_empress"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_famous_diamonds_golden_empress"
                                      style="animation-delay: 0.1s"
                                      >Golden Empress</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="highjewellery_famous_diamonds_diamond_timeline"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="highjewellery_famous_diamonds_diamond_timeline"
                                      style="animation-delay: 0.12s"
                                      >Diamond Timeline</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </div>
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item h-hidden__m"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-high-jewellery__featured-banner"
                            >
                              <!-- dwMarker="content" dwContentID="2ad90155f617e72741ba3946d4" -->
                              <div class="b-megamenu-banner">
                                <div class="b-megamenu-banner__image-holder">
                                  <img
                                    alt="Temp Alt"
                                    class="b-megamenu-banner__image hidden"
                                    loading="lazy"
                                    src="/assets/img/Navigation_MM_High_Jewellery_2026_Update_1890x1059px.jpg"
                                  />
                                </div>

                                <div class="b-megamenu-banner__content">
                                  <div class="b-megamenu-banner__title">
                                    THE MOST FABULOUS JEWELS IN THE WORLD
                                  </div>

                                  <div
                                    class="b-megamenu-banner__content-markup"
                                  >
                                    <span style="desktop-font-size: 13px"
                                      >Discover exemplary high jewellery
                                      creations thoughtfully designed and
                                      expertly crafted by Graff’s master
                                      artisans.
                                    </span>
                                  </div>

                                  <div class="b-megamenu-banner__cta-holder">
                                    <NuxtLink
                                      to="/"
                                      class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                      style="animation-delay: 0.08s"
                                      >Discover
                                    </NuxtLink>
                                  </div>
                                  <br />
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li
                class="b-header-menu__item m-has-subcategories js-has-subcategories"
                data-category-id="jewellerycollections"
              >
                <NuxtLink
                  to="/"
                  class="b-header-menu__link js-header-menu__link"
                  aria-haspopup="true"
                  style="animation-delay: 0.02s"
                >
                  <span class="b-header-menu__link-text">Jewellery</span>
                  <span
                    class="b-icon b-icon--chevron-right"
                    aria-hidden="true"
                  ></span>
                </NuxtLink>

                <div class="b-header-dropdownmenu js-header-submenu">
                  <div class="b-header-dropdownmenu__inner">
                    <div
                      class="b-header-submenu b-header-submenu--no-margin b-header-submenu-full js-header-submenu"
                    >
                      <ul
                        class="b-header-submenu__list b-header-dropdownmenu__list"
                        role="menu"
                      >
                        <div class="l-grid__row h-mx--0">
                          <div
                            class="l-grid__col-4-sm l-grid__col-12-l2 h-hidden__m b-header-dropdownmenu__list__item b-header-dropdownmenu__list__item--image"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-jewellery__featured-banner-AB-TEST-1"
                            >
                              <!-- dwMarker="content" dwContentID="c318195bed0aa1d6de2de99a7f" -->
                              <div class="b-megamenu-banner">
                                <div class="b-megamenu-banner__image-holder">
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image block"
                                      src="/assets/img/LG_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="laurence-graff-signature"
                                      src="/assets/img/LG_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="butterfly"
                                      src="/assets/img/butterfly_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="wild-flower"
                                      src="/assets/img/wildflower_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="tildas-bow"
                                      src="/assets/img/tildasbow_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="classic-graff"
                                      src="/assets/img/classic_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="icon"
                                      src="/assets/img/Icon_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="spiral"
                                      src="/assets/img/spiralv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="foufou"
                                      src="/assets/img/foufoucarousldesktop.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="betogether"
                                      src="/assets/img/betogther_carouselv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="threads"
                                      src="/assets/img/threadsv2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="followme"
                                      src="/assets/img/followmev2.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item h-hidden__m"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-jewellery__shopby__collection-AB-TEST-1"
                            >
                              <!-- dwMarker="content" dwContentID="dad2db9bff2a053b1881c8ce0d" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories h-mb--0"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0s"
                                >
                                  <span>Shop By Collection</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="laurence-graff-signature"
                                          style="animation-delay: 0s"
                                        >
                                          Laurence Graff Signature
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="butterfly"
                                          style="animation-delay: 0.02s"
                                        >
                                          Butterfly
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="wild-flower"
                                          style="animation-delay: 0.04s"
                                        >
                                          Wild Flower
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="tildas-bow"
                                          style="animation-delay: 0.06s"
                                        >
                                          Tilda's Bow
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="classic-graff"
                                          style="animation-delay: 0.08s"
                                        >
                                          Classic Graff
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="icon"
                                          style="animation-delay: 0.1s"
                                        >
                                          Icon
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="spiral"
                                          style="animation-delay: 0.12s"
                                        >
                                          Spiral
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="foufou"
                                          style="animation-delay: 0.14s"
                                        >
                                          Foufou
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="betogether"
                                          style="animation-delay: 0.16s"
                                        >
                                          Be Together
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="threads"
                                          style="animation-delay: 0.18s"
                                        >
                                          Threads
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="followme"
                                          style="animation-delay: 0.2s"
                                        >
                                          Follow Me
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.22s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-jewellery__shopby__category"
                            >
                              <!-- dwMarker="content" dwContentID="33355f748b5621c2ad037bfa9b" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories h-mb--0"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.02s"
                                >
                                  <span>Shop By Category</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0s"
                                        >
                                          Necklaces &amp; Pendants
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.02s"
                                        >
                                          Rings
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.04s"
                                        >
                                          Earrings
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.06s"
                                        >
                                          Stud Earrings
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.08s"
                                        >
                                          Bracelets &amp; Bangles
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.1s"
                                        >
                                          Watches
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.12s"
                                        >
                                          Men's Jewellery
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.14s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-jewellery__shopby__gemstone"
                            >
                              <!-- dwMarker="content" dwContentID="5d049dbc7ebca078d563b696ee" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories h-mb--24__d"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.04s"
                                >
                                  <span>Shop by Gemstone</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0s"
                                        >
                                          White Diamond
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.02s"
                                        >
                                          Yellow Diamond
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.04s"
                                        >
                                          Emerald
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.06s"
                                        >
                                          Sapphire
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.08s"
                                        >
                                          Ruby
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.1s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-jewellery__shopby__metal"
                            >
                              <!-- dwMarker="content" dwContentID="6509b3e2f324abdebc7c23d597" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories h-mb--24__d"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.06s"
                                >
                                  <span>Shop By Metal</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0s"
                                        >
                                          White Gold
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.02s"
                                        >
                                          Rose Gold
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.04s"
                                        >
                                          Yellow Gold
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.06s"
                                        >
                                          Platinum
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.08s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item h-hidden__d"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-jewellery__shopby__curated"
                            >
                              <!-- dwMarker="content" dwContentID="d55b76861dca6d59b6c33a6f53" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories h-mb--24__d"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.08s"
                                >
                                  <span>Curated By Graff</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0s"
                                        >
                                          New Jewellery
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.02s"
                                        >
                                          Stacking Jewellery
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.04s"
                                        >
                                          Inspired by Nature
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.06s"
                                        >
                                          Jewellery Sets
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                        </div>
                      </ul>
                      <div
                        class="l-grid__col-6-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item h-hidden__d"
                      >
                        <div
                          class="b-content-asset content-asset"
                          data-content-id="menu-jewellery__carousel-banner"
                        >
                          <!-- dwMarker="content" dwContentID="f5cbcc1a31e14264c7e58b109a" -->
                          <div
                            class="b-header-dropdownmenu__list__item__carousel"
                          >
                            <div class="b-carousel-container__header">
                              <span>Graff Collections</span>
                            </div>
                            <div
                              class="b-header-dropdownmenu__list__item__slides"
                            >
                              <div class="js-carousel__slide">
                                <div
                                  class="b-bnr-container h-pt--16"
                                  data-content-asset-uuid="a4323d1b1e9a948383945cdaea"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide2"
                                >
                                  <!-- dwMarker="content" dwContentID="a4323d1b1e9a948383945cdaea" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_lg_signature_2025.jpg"
                                                alt="Laurence Graff Signature"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Laurence Graff Signature
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="431dab29d14a57cf3c7d75b350"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide1"
                                >
                                  <!-- dwMarker="content" dwContentID="431dab29d14a57cf3c7d75b350" -->
                                  <div
                                    class="b-bnr js-bnr h-pt--16 m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_butterfly_2025.jpg"
                                                alt="Butterfly"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Butterfly
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="d05a19bd16aa8ee89fdbfffa88"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide3"
                                >
                                  <!-- dwMarker="content" dwContentID="d05a19bd16aa8ee89fdbfffa88" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_wildflower_2025.jpg"
                                                alt="Wild Flower"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Wild Flower
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="7e504f9f91bfd63ef75fec72a2"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide7"
                                >
                                  <!-- dwMarker="content" dwContentID="7e504f9f91bfd63ef75fec72a2" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_tb_2025.jpg"
                                                alt="Tildas Bow"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Tilda's Bow
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="c78a2e0d5252a4d8fe994bd26d"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide8"
                                >
                                  <!-- dwMarker="content" dwContentID="c78a2e0d5252a4d8fe994bd26d" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_classic_2025.jpg"
                                                alt="Classic Graff"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Classic Graff
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="e5dc1a94120b0347d7a5e5471f"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide4"
                                >
                                  <!-- dwMarker="content" dwContentID="e5dc1a94120b0347d7a5e5471f" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_icon_2025.jpg"
                                                alt="Icon"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">Icon</h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="f24b2359b300c0567ea6ac6040"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide5"
                                >
                                  <!-- dwMarker="content" dwContentID="f24b2359b300c0567ea6ac6040" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_spiral_2025.jpg"
                                                alt="Spiral"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Spiral
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="085d269d1448725b17539becc8"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide10"
                                >
                                  <!-- dwMarker="content" dwContentID="085d269d1448725b17539becc8" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/foufoucarouslmobile.jpg"
                                                alt="Foufou"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Foufou
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="f8b8358dcaa9dd7af6c4937fe3"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide6"
                                >
                                  <!-- dwMarker="content" dwContentID="f8b8358dcaa9dd7af6c4937fe3" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_threads_2025.jpg"
                                                alt="Threads"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Threads
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="4e2bd48e31788fc1f68d8f7422"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide9"
                                >
                                  <!-- dwMarker="content" dwContentID="4e2bd48e31788fc1f68d8f7422" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_btgher_2025.jpg"
                                                alt="Be Together"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Be Together
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                              <div class="">
                                <div
                                  class="b-bnr-container"
                                  data-content-asset-uuid="31f3b04a154d8ca65cc7308b59"
                                  data-content-asset-id="menu-jewellery__carousel-banner-slide11"
                                >
                                  <!-- dwMarker="content" dwContentID="31f3b04a154d8ca65cc7308b59" -->
                                  <div
                                    class="b-bnr js-bnr m-content-pos--default"
                                  >
                                    <div class="b-bnr__inner">
                                      <div class="b-bnr__image">
                                        <div class="b-bnr__wrapper">
                                          <div class="b-picture b-bnr__picture">
                                            <picture
                                              class="b-picture__el js-picture-el"
                                            >
                                              <img
                                                class="b-picture__image js-picture__image"
                                                src="/assets/img/evergreen2_followme_2025.jpg"
                                                alt="Follow Me"
                                                title=""
                                                loading="lazy"
                                              />
                                            </picture>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        class="b-bnr__content js-banner__content"
                                      >
                                        <div class="b-bnr__content-inner">
                                          <div
                                            class="b-bnr__content-markup-field"
                                          >
                                            <h2 style="color: #000000">
                                              Follow Me
                                            </h2>
                                          </div>

                                          <div class=""></div>
                                        </div>
                                      </div>

                                      <a
                                        class="b-link--overlay"
                                        href="/"
                                        aria-label="Banner Overlay Link"
                                        >&nbsp;</a
                                      >
                                    </div>
                                  </div>
                                  <!-- End content-asset -->
                                </div>
                              </div>
                            </div>
                            <div class="b-carousel-container__footer">
                              <NuxtLink to="/">View All</NuxtLink>
                            </div>
                          </div>
                        </div>
                        <!-- End content-asset -->
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li
                class="b-header-menu__item m-has-subcategories js-has-subcategories"
                data-category-id="bridal"
              >
                <NuxtLink
                  to="/"
                  class="b-header-menu__link js-header-menu__link"
                  aria-haspopup="true"
                  style="animation-delay: 0.04s"
                >
                  <span class="b-header-menu__link-text"
                    >Engagement &amp; Bridal</span
                  >
                  <span
                    class="b-icon b-icon--chevron-right"
                    aria-hidden="true"
                  ></span>
                </NuxtLink>

                <div class="b-header-dropdownmenu js-header-submenu">
                  <div class="b-header-dropdownmenu__inner">
                    <div
                      class="b-header-submenu b-header-submenu--no-margin b-header-submenu-full js-header-submenu"
                    >
                      <ul
                        class="b-header-submenu__list b-header-dropdownmenu__list"
                        role="menu"
                      >
                        <div class="l-grid__row h-mx--0">
                          <div
                            class="l-grid__col-4-sm l-grid__col-12-l2 h-hidden__m b-header-dropdownmenu__list__item b-header-dropdownmenu__list__item--image"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-engagementbridal__featured-banner-AB-TEST-1"
                            >
                              <!-- dwMarker="content" dwContentID="b89f11f460a15adbe34f939211" -->
                              <div class="b-megamenu-banner">
                                <div class="b-megamenu-banner__image-holder">
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image block"
                                      src="/assets/img/promisev1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="promise"
                                      src="/assets/img/promisev1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="icon"
                                      src="/assets/img/iconbridalv1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="paragon"
                                      src="/assets/img/paragonbridalv1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="flame"
                                      src="/assets/img/flamebridalv1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="legacy"
                                      src="/assets/img/legacybridalv1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="constellation"
                                      src="/assets/img/constellationbridalv1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                  <NuxtLink to="/">
                                    <img
                                      class="b-megamenu-banner__image b-megamenu-banner__image-hover hidden"
                                      id="laurencegraffsignaturebridal"
                                      src="/assets/img/lgsignaturebridalv1.jpg"
                                      loading="lazy"
                                    />
                                  </NuxtLink>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 h-hidden__m b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-engagementbridal__engagementrings-AB-TEST-1"
                            >
                              <!-- dwMarker="content" dwContentID="e9756dafc2837d513ecd3098ed" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories h-mb--0"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0s"
                                >
                                  <span>Engagement Rings</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="promise"
                                          style="animation-delay: 0s"
                                        >
                                          Promise
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="icon"
                                          style="animation-delay: 0.02s"
                                        >
                                          Icon
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="paragon"
                                          style="animation-delay: 0.04s"
                                        >
                                          Paragon
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="flame"
                                          style="animation-delay: 0.06s"
                                        >
                                          Flame
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="legacy"
                                          style="animation-delay: 0.08s"
                                        >
                                          Legacy
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="constellation"
                                          style="animation-delay: 0.1s"
                                        >
                                          Constellation
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="laurencegraffsignaturebridal"
                                          style="animation-delay: 0.12s"
                                        >
                                          Laurence Graff Signature
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.14s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 h-hidden__d b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-engagementbridal__engagementrings"
                            >
                              <!-- dwMarker="content" dwContentID="0c44fd9d6122253bac6764d86d" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.02s"
                                >
                                  <span>Engagement Rings</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list h-hidden__d"
                                      role="menu"
                                    >
                                      <div
                                        class="l-grid__col-6-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item"
                                      >
                                        <div
                                          class="b-content-asset content-asset"
                                          data-content-id="menu-engagementbridal__carousel-banner"
                                        >
                                          <!-- dwMarker="content" dwContentID="479fb420839cc5601cf988cee3" -->
                                          <div
                                            class="b-header-dropdownmenu__list__item__carousel h-hidden__d"
                                          >
                                            <div
                                              class="b-carousel-container__header"
                                            >
                                              <span></span>
                                            </div>
                                            <div
                                              class="b-header-dropdownmenu__list__item__slides"
                                            >
                                              <div class="js-carousel__slide">
                                                <div
                                                  class="b-bnr-container"
                                                  data-content-asset-uuid="a28567624efc4f3044ae7fd243"
                                                  data-content-asset-id="menu-engagementbridal__carousel-banner-slide1"
                                                >
                                                  <!-- dwMarker="content" dwContentID="a28567624efc4f3044ae7fd243" -->
                                                  <div
                                                    class="b-bnr js-bnr m-content-pos--default"
                                                  >
                                                    <div class="b-bnr__inner">
                                                      <div class="b-bnr__image">
                                                        <div
                                                          class="b-bnr__wrapper"
                                                        >
                                                          <div
                                                            class="b-picture b-bnr__picture"
                                                          >
                                                            <picture
                                                              class="b-picture__el js-picture-el"
                                                            >
                                                              <img
                                                                class="b-picture__image js-picture__image"
                                                                src="/assets/img/Ring1.jpg"
                                                                alt="Promise"
                                                                title=""
                                                                loading="lazy"
                                                              />
                                                            </picture>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div
                                                        class="b-bnr__content js-banner__content"
                                                      >
                                                        <div
                                                          class="b-bnr__content-inner"
                                                        >
                                                          <div
                                                            class="b-bnr__content-markup-field"
                                                          >
                                                            <h2
                                                              style="
                                                                color: #000000;
                                                              "
                                                            >
                                                              Promise
                                                            </h2>
                                                          </div>

                                                          <div class=""></div>
                                                        </div>
                                                      </div>

                                                      <a
                                                        class="b-link--overlay"
                                                        href="/"
                                                        aria-label="Banner Overlay Link"
                                                        >&nbsp;</a
                                                      >
                                                    </div>
                                                  </div>
                                                  <!-- End content-asset -->
                                                </div>
                                              </div>
                                              <div class="">
                                                <div
                                                  class="b-bnr-container"
                                                  data-content-asset-uuid="3970c9b12ef4d47ec6d6192105"
                                                  data-content-asset-id="menu-engagementbridal__carousel-banner-slide3"
                                                >
                                                  <!-- dwMarker="content" dwContentID="3970c9b12ef4d47ec6d6192105" -->
                                                  <div
                                                    class="b-bnr js-bnr m-content-pos--default"
                                                  >
                                                    <div class="b-bnr__inner">
                                                      <div class="b-bnr__image">
                                                        <div
                                                          class="b-bnr__wrapper"
                                                        >
                                                          <div
                                                            class="b-picture b-bnr__picture"
                                                          >
                                                            <picture
                                                              class="b-picture__el js-picture-el"
                                                            >
                                                              <img
                                                                class="b-picture__image js-picture__image"
                                                                src="/assets/img/Ring6.jpg"
                                                                alt="Paragon"
                                                                title=""
                                                                loading="lazy"
                                                              />
                                                            </picture>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div
                                                        class="b-bnr__content js-banner__content"
                                                      >
                                                        <div
                                                          class="b-bnr__content-inner"
                                                        >
                                                          <div
                                                            class="b-bnr__content-markup-field"
                                                          >
                                                            <h2
                                                              style="
                                                                color: #000000;
                                                              "
                                                            >
                                                              Paragon
                                                            </h2>
                                                          </div>

                                                          <div class=""></div>
                                                        </div>
                                                      </div>

                                                      <a
                                                        class="b-link--overlay"
                                                        href="/"
                                                        aria-label="Banner Overlay Link"
                                                        >&nbsp;</a
                                                      >
                                                    </div>
                                                  </div>
                                                  <!-- End content-asset -->
                                                </div>
                                              </div>
                                              <div class="">
                                                <div
                                                  class="b-bnr-container"
                                                  data-content-asset-uuid="c1d2bc2dc890349282169b2a76"
                                                  data-content-asset-id="menu-engagementbridal__carousel-banner-slide4"
                                                >
                                                  <!-- dwMarker="content" dwContentID="c1d2bc2dc890349282169b2a76" -->
                                                  <div
                                                    class="b-bnr js-bnr m-content-pos--default"
                                                  >
                                                    <div class="b-bnr__inner">
                                                      <div class="b-bnr__image">
                                                        <div
                                                          class="b-bnr__wrapper"
                                                        >
                                                          <div
                                                            class="b-picture b-bnr__picture"
                                                          >
                                                            <picture
                                                              class="b-picture__el js-picture-el"
                                                            >
                                                              <img
                                                                class="b-picture__image js-picture__image"
                                                                src="/assets/img/Ring7.jpg"
                                                                alt="Flame"
                                                                title=""
                                                                loading="lazy"
                                                              />
                                                            </picture>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div
                                                        class="b-bnr__content js-banner__content"
                                                      >
                                                        <div
                                                          class="b-bnr__content-inner"
                                                        >
                                                          <div
                                                            class="b-bnr__content-markup-field"
                                                          >
                                                            <h2
                                                              style="
                                                                color: #000000;
                                                              "
                                                            >
                                                              Flame
                                                            </h2>
                                                          </div>

                                                          <div class=""></div>
                                                        </div>
                                                      </div>

                                                      <a
                                                        class="b-link--overlay"
                                                        href="/"
                                                        aria-label="Banner Overlay Link"
                                                        >&nbsp;</a
                                                      >
                                                    </div>
                                                  </div>
                                                  <!-- End content-asset -->
                                                </div>
                                              </div>
                                              <div class="">
                                                <div
                                                  class="b-bnr-container"
                                                  data-content-asset-uuid="fdd6218cc36716b2bb9d713521"
                                                  data-content-asset-id="menu-engagementbridal__carousel-banner-slide2"
                                                >
                                                  <!-- dwMarker="content" dwContentID="fdd6218cc36716b2bb9d713521" -->
                                                  <div
                                                    class="b-bnr js-bnr m-content-pos--default"
                                                  >
                                                    <div class="b-bnr__inner">
                                                      <div class="b-bnr__image">
                                                        <div
                                                          class="b-bnr__wrapper"
                                                        >
                                                          <div
                                                            class="b-picture b-bnr__picture"
                                                          >
                                                            <picture
                                                              class="b-picture__el js-picture-el"
                                                            >
                                                              <img
                                                                class="b-picture__image js-picture__image"
                                                                src="/assets/img/Ring3.jpg"
                                                                alt="Icon"
                                                                title=""
                                                                loading="lazy"
                                                              />
                                                            </picture>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div
                                                        class="b-bnr__content js-banner__content"
                                                      >
                                                        <div
                                                          class="b-bnr__content-inner"
                                                        >
                                                          <div
                                                            class="b-bnr__content-markup-field"
                                                          >
                                                            <h2
                                                              style="
                                                                color: #000000;
                                                              "
                                                            >
                                                              Icon
                                                            </h2>
                                                          </div>

                                                          <div class=""></div>
                                                        </div>
                                                      </div>

                                                      <a
                                                        class="b-link--overlay"
                                                        href="/"
                                                        aria-label="Banner Overlay Link"
                                                        >&nbsp;</a
                                                      >
                                                    </div>
                                                  </div>
                                                  <!-- End content-asset -->
                                                </div>
                                              </div>
                                              <div class="">
                                                <div
                                                  class="b-bnr-container"
                                                  data-content-asset-uuid="cba50a3cf7731f54d222aba625"
                                                  data-content-asset-id="menu-engagementbridal__carousel-banner-slide5"
                                                >
                                                  <!-- dwMarker="content" dwContentID="cba50a3cf7731f54d222aba625" -->
                                                  <div
                                                    class="b-bnr js-bnr m-content-pos--default"
                                                  >
                                                    <div class="b-bnr__inner">
                                                      <div class="b-bnr__image">
                                                        <div
                                                          class="b-bnr__wrapper"
                                                        >
                                                          <div
                                                            class="b-picture b-bnr__picture"
                                                          >
                                                            <picture
                                                              class="b-picture__el js-picture-el"
                                                            >
                                                              <img
                                                                class="b-picture__image js-picture__image"
                                                                src="/assets/img/Ring5.jpg"
                                                                alt="Constellation"
                                                                title=""
                                                                loading="lazy"
                                                              />
                                                            </picture>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div
                                                        class="b-bnr__content js-banner__content"
                                                      >
                                                        <div
                                                          class="b-bnr__content-inner"
                                                        >
                                                          <div
                                                            class="b-bnr__content-markup-field"
                                                          >
                                                            <h2
                                                              style="
                                                                color: #000000;
                                                              "
                                                            >
                                                              Constellation
                                                            </h2>
                                                          </div>

                                                          <div class=""></div>
                                                        </div>
                                                      </div>

                                                      <a
                                                        class="b-link--overlay"
                                                        href="/"
                                                        aria-label="Banner Overlay Link"
                                                        >&nbsp;</a
                                                      >
                                                    </div>
                                                  </div>
                                                  <!-- End content-asset -->
                                                </div>
                                              </div>
                                              <div class="">
                                                <div
                                                  class="b-bnr-container"
                                                  data-content-asset-uuid="3eb45ea36f69750d035f0721e8"
                                                  data-content-asset-id="menu-engagementbridal__carousel-banner-slide6"
                                                >
                                                  <!-- dwMarker="content" dwContentID="3eb45ea36f69750d035f0721e8" -->
                                                  <div
                                                    class="b-bnr js-bnr m-content-pos--default"
                                                  >
                                                    <div class="b-bnr__inner">
                                                      <div class="b-bnr__image">
                                                        <div
                                                          class="b-bnr__wrapper"
                                                        >
                                                          <div
                                                            class="b-picture b-bnr__picture"
                                                          >
                                                            <picture
                                                              class="b-picture__el js-picture-el"
                                                            >
                                                              <img
                                                                class="b-picture__image js-picture__image"
                                                                src="/assets/img/Ring2.jpg"
                                                                alt="Legacy"
                                                                title=""
                                                                loading="lazy"
                                                              />
                                                            </picture>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div
                                                        class="b-bnr__content js-banner__content"
                                                      >
                                                        <div
                                                          class="b-bnr__content-inner"
                                                        >
                                                          <div
                                                            class="b-bnr__content-markup-field"
                                                          >
                                                            <h2
                                                              style="
                                                                color: #000000;
                                                              "
                                                            >
                                                              Legacy
                                                            </h2>
                                                          </div>

                                                          <div class=""></div>
                                                        </div>
                                                      </div>

                                                      <a
                                                        class="b-link--overlay"
                                                        href="/"
                                                        aria-label="Banner Overlay Link"
                                                        >&nbsp;</a
                                                      >
                                                    </div>
                                                  </div>
                                                  <!-- End content-asset -->
                                                </div>
                                              </div>
                                              <div class="">
                                                <div
                                                  class="b-bnr-container"
                                                  data-content-asset-uuid="730bb58ad53d807b12967489be"
                                                  data-content-asset-id="menu-engagementbridal__carousel-banner-slide7"
                                                >
                                                  <!-- dwMarker="content" dwContentID="730bb58ad53d807b12967489be" -->
                                                  <div
                                                    class="b-bnr js-bnr m-content-pos--default"
                                                  >
                                                    <div class="b-bnr__inner">
                                                      <div class="b-bnr__image">
                                                        <div
                                                          class="b-bnr__wrapper"
                                                        >
                                                          <div
                                                            class="b-picture b-bnr__picture"
                                                          >
                                                            <picture
                                                              class="b-picture__el js-picture-el"
                                                            >
                                                              <img
                                                                class="b-picture__image js-picture__image"
                                                                src="/assets/img/Ring4.jpg"
                                                                alt="Laurence Graff Signature"
                                                                title=""
                                                                loading="lazy"
                                                              />
                                                            </picture>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <div
                                                        class="b-bnr__content js-banner__content"
                                                      >
                                                        <div
                                                          class="b-bnr__content-inner"
                                                        >
                                                          <div
                                                            class="b-bnr__content-markup-field"
                                                          >
                                                            <h2
                                                              style="
                                                                color: #000000;
                                                              "
                                                            >
                                                              Laurence Graff
                                                              Signature
                                                            </h2>
                                                          </div>

                                                          <div class=""></div>
                                                        </div>
                                                      </div>

                                                      <a
                                                        class="b-link--overlay"
                                                        href="/"
                                                        aria-label="Banner Overlay Link"
                                                        >&nbsp;</a
                                                      >
                                                    </div>
                                                  </div>
                                                  <!-- End content-asset -->
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              class="b-carousel-container__footer"
                                            >
                                              <NuxtLink to="/"
                                                >View All</NuxtLink
                                              >
                                            </div>
                                          </div>
                                        </div>
                                        <!-- End content-asset -->
                                      </div>
                                    </ul>
                                    <ul
                                      class="b-header-submenu__list h-hidden__m"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0s"
                                        >
                                          Promise
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.02s"
                                        >
                                          Icon
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.04s"
                                        >
                                          Paragon
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.06s"
                                        >
                                          Flame
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.08s"
                                        >
                                          Legacy
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.1s"
                                        >
                                          Constellation
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.12s"
                                        >
                                          Laurence Graff Signature
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.14s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-engagementbridal__weddingbands"
                            >
                              <!-- dwMarker="content" dwContentID="02f689f895598c463d8e688ce8" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.04s"
                                >
                                  <span>Wedding Bands</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0s"
                                        >
                                          For Her
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.02s"
                                        >
                                          For Him
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.04s"
                                        >
                                          Eternity Rings
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.06s"
                                        >
                                          Couples’ Rings
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.08s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-engagementbridal__weddingbands__shape"
                            >
                              <!-- dwMarker="content" dwContentID="ff9cb03b4cdb81f8d423ce3cb3" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.06s"
                                >
                                  <span>Stone Shapes</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0s"
                                        >
                                          Round
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.02s"
                                        >
                                          Emerald
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.04s"
                                        >
                                          Pear
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.06s"
                                        >
                                          Oval
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.08s"
                                        >
                                          Heart
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.1s"
                                        >
                                          Radiant
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.12s"
                                        >
                                          Cushion
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.14s"
                                        >
                                          Marquise
                                        </NuxtLink>
                                      </li>
                                      <li class="b-header-submenu__item">
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary b-header-submenu__link-viewall js-header-submenu__item-link"
                                          style="animation-delay: 0.16s"
                                        >
                                          View All
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-engagementbridal__bridalguides"
                            >
                              <!-- dwMarker="content" dwContentID="097991173fdb90dad30863e841" -->
                              <div
                                class="b-header-submenu__item b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                                role="menuitem"
                              >
                                <NuxtLink
                                  to="/"
                                  class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                  style="animation-delay: 0.08s"
                                >
                                  <span>Bridal Guides</span>
                                  <span
                                    class="b-icon b-icon--chevron-right"
                                    aria-hidden="true"
                                  ></span>
                                </NuxtLink>
                                <div class="b-header-submenu js-header-submenu">
                                  <div class="l-grid__row h-mx--0">
                                    <ul
                                      class="b-header-submenu__list"
                                      role="menu"
                                    >
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0s"
                                        >
                                          Diamond Certification
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          style="animation-delay: 0.02s"
                                        >
                                          The 4Cs
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.04s"
                                        >
                                          Diamond Shapes &amp; Cuts
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.06s"
                                        >
                                          Diamond Colour
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.08s"
                                        >
                                          Diamond Clarity
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.1s"
                                        >
                                          Diamond Carat
                                        </NuxtLink>
                                      </li>
                                      <li
                                        class="b-header-submenu__item"
                                        role="menuitem"
                                      >
                                        <NuxtLink
                                          to="/"
                                          class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                          data-category-id="unique_jewels_uniquesolitaires"
                                          style="animation-delay: 0.12s"
                                        >
                                          The Graff Difference
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                          <div
                            class="l-grid__col-2-sm l-grid__col-12-l2 h-hidden__d b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-engagementbridal__featured-banner"
                            >
                              <!-- dwMarker="content" dwContentID="221931c252783146660eae64eb" -->
                              <div class="b-megamenu-banner">
                                <div class="b-megamenu-banner__image-holder">
                                  <img
                                    alt="Temp Alt"
                                    class="b-megamenu-banner__image hidden"
                                    loading="lazy"
                                    src="/assets/img/Naviagtion_MM_Engagement.jpg"
                                  />
                                </div>

                                <div class="b-megamenu-banner__content">
                                  <div class="b-megamenu-banner__title">
                                    ENGAGEMENT RINGS
                                  </div>

                                  <div
                                    class="b-megamenu-banner__content-markup"
                                  >
                                    <span style="desktop-font-size: 13px"
                                      >Explore our rarefied collection of
                                      solitaire rings.</span
                                    >
                                  </div>

                                  <div class="b-megamenu-banner__cta-holder">
                                    <NuxtLink
                                      to="/"
                                      class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                      style="animation-delay: 0.1s"
                                      >Discover
                                    </NuxtLink>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li class="b-header-menu__item" data-category-id="watches">
                <NuxtLink
                  to="/"
                  class="b-header-menu__link js-header-menu__link"
                  aria-haspopup="false"
                  style="animation-delay: 0.06s"
                >
                  <span class="b-header-menu__link-text">Watches</span>
                  <span
                    class="b-icon b-icon--chevron-right"
                    aria-hidden="true"
                  ></span>
                </NuxtLink>
              </li>

              <li
                class="b-header-menu__item m-has-subcategories js-has-subcategories"
                data-category-id="Gifts"
              >
                <NuxtLink
                  to="/"
                  class="b-header-menu__link js-header-menu__link"
                  aria-haspopup="true"
                  style="animation-delay: 0.08s"
                >
                  <span class="b-header-menu__link-text">Gifts</span>
                  <span
                    class="b-icon b-icon--chevron-right"
                    aria-hidden="true"
                  ></span>
                </NuxtLink>

                <div class="b-header-dropdownmenu js-header-submenu">
                  <div class="b-header-dropdownmenu__inner">
                    <div class="b-header-submenu js-header-submenu">
                      <ul
                        class="b-header-submenu__list b-header-dropdownmenu__list"
                        role="menu"
                      >
                        <div class="l-grid__row l-grid__row--center h-mx--0">
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item h-hidden__m"
                          >
                            <li
                              class="b-header-submenu__item b-header-submenu__item-full b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                              data-category-id="Gifts"
                              role="menuitem"
                            >
                              <NuxtLink
                                to="/"
                                class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link b-no-link js-no-link"
                                data-category-id="Gifts"
                                style="animation-delay: 0s"
                              >
                                <span>Gifts</span>
                                <span
                                  class="b-icon b-icon--chevron-right"
                                  aria-hidden="true"
                                ></span>
                              </NuxtLink>

                              <div class="b-header-submenu js-header-submenu">
                                <ul class="b-header-submenu__list">
                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="gifts_for_her"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="gifts_for_her"
                                      style="animation-delay: 0s"
                                      >Gifts for Her</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="ultimate_gifts"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="ultimate_gifts"
                                      style="animation-delay: 0.02s"
                                      >Ultimate Gifts</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="classic_gifts"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="classic_gifts"
                                      style="animation-delay: 0.04s"
                                      >Classic Gifts</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="romantic_gifts"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="romantic_gifts"
                                      style="animation-delay: 0.06s"
                                      >Anniversary Gifts</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="contemporary_gifts"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="contemporary_gifts"
                                      style="animation-delay: 0.08s"
                                      >Contemporary Gifts</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="iconic_gifts"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="iconic_gifts"
                                      style="animation-delay: 0.1s"
                                      >Iconic Gifts</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="gifts_for_couples"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="gifts_for_couples"
                                      style="animation-delay: 0.12s"
                                      >Couples Gifts</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="gifts_for_Him"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="gifts_for_Him"
                                      style="animation-delay: 0.14s"
                                      >Gifts for Him</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </div>
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item h-hidden__d"
                          >
                            <div
                              class="b-header-submenu js-header-submenu b-header-submenu__standalone"
                            >
                              <ul class="b-header-submenu__list">
                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="gifts_for_her"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="gifts_for_her"
                                    style="animation-delay: 0s"
                                    >Gifts for Her</a
                                  >
                                </li>

                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="ultimate_gifts"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="ultimate_gifts"
                                    style="animation-delay: 0.02s"
                                    >Ultimate Gifts</a
                                  >
                                </li>

                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="classic_gifts"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="classic_gifts"
                                    style="animation-delay: 0.04s"
                                    >Classic Gifts</a
                                  >
                                </li>

                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="romantic_gifts"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="romantic_gifts"
                                    style="animation-delay: 0.06s"
                                    >Anniversary Gifts</a
                                  >
                                </li>

                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="contemporary_gifts"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="contemporary_gifts"
                                    style="animation-delay: 0.08s"
                                    >Contemporary Gifts</a
                                  >
                                </li>

                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="iconic_gifts"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="iconic_gifts"
                                    style="animation-delay: 0.1s"
                                    >Iconic Gifts</a
                                  >
                                </li>

                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="gifts_for_couples"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="gifts_for_couples"
                                    style="animation-delay: 0.12s"
                                    >Couples Gifts</a
                                  >
                                </li>

                                <li
                                  class="b-header-submenu__item b-header-submenu__item-full"
                                  data-category-id="gifts_for_Him"
                                >
                                  <a
                                    href="/"
                                    class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                    data-category-id="gifts_for_Him"
                                    style="animation-delay: 0.14s"
                                    >Gifts for Him</a
                                  >
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div
                            class="l-grid__col-9-sm b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-gifting__featured-banner"
                            >
                              <!-- dwMarker="content" dwContentID="10188d430a2bbc5c78a08b5306" -->
                              <div
                                class="b-megamenu-banner b-megamenu-banner-wide"
                              >
                                <div class="b-megamenu-banner__image-holder">
                                  <img
                                    alt="Temp Alt"
                                    class="b-megamenu-banner__image hidden"
                                    loading="lazy"
                                    src="/assets/img/Megamenu_Banner_Gifts_Valentines_Day_2026_1890x1059px.jpg"
                                  />
                                </div>

                                <div class="b-megamenu-banner__content">
                                  <div class="b-megamenu-banner__title">
                                    THE GIFT OF GRAFF
                                  </div>

                                  <div
                                    class="b-megamenu-banner__content-markup"
                                  >
                                    <span style="desktop-font-size: 13px"
                                      >A symbol of elegance, grace and
                                      everlasting beauty, every gift from Graff
                                      captures the magic of the moment.</span
                                    >
                                  </div>

                                  <div class="b-megamenu-banner__cta-holder">
                                    <a
                                      class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                      href="/"
                                      style="animation-delay: 0.02s"
                                      >Discover all Gifts</a
                                    >
                                  </div>
                                  <br />
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li
                class="b-header-menu__item m-has-subcategories js-has-subcategories"
                data-category-id="the_house"
              >
                <NuxtLink
                  to="/"
                  class="b-header-menu__link js-header-menu__link"
                  aria-haspopup="true"
                  style="animation-delay: 0.1s"
                >
                  <span class="b-header-menu__link-text">The House</span>
                  <span
                    class="b-icon b-icon--chevron-right"
                    aria-hidden="true"
                  ></span>
                </NuxtLink>

                <div class="b-header-dropdownmenu js-header-submenu">
                  <div class="b-header-dropdownmenu__inner">
                    <div class="b-header-submenu js-header-submenu">
                      <ul
                        class="b-header-submenu__list b-header-dropdownmenu__list"
                        role="menu"
                      >
                        <div class="l-grid__row l-grid__row--center h-mx--0">
                          <div
                            class="l-grid__col-3-sm b-header-dropdownmenu__list__item"
                          >
                            <li
                              class="b-header-submenu__item b-header-submenu__item-full b-header-dropdownmenu__item js-header-dropdownmenu__item m-has-subcategories js-has-subcategories"
                              data-category-id="the_house_the_house"
                              role="menuitem"
                            >
                              <NuxtLink
                                to="/"
                                class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link b-no-link js-no-link"
                                data-category-id="the_house_the_house"
                                style="animation-delay: 0s"
                              >
                                <span>The House</span>
                                <span
                                  class="b-icon b-icon--chevron-right"
                                  aria-hidden="true"
                                ></span>
                              </NuxtLink>

                              <div class="b-header-submenu js-header-submenu">
                                <ul class="b-header-submenu__list">
                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="the_house_this_is_graff"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="the_house_this_is_graff"
                                      style="animation-delay: 0s"
                                      >This is Graff</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="the_house_history_and_heritage"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="the_house_history_and_heritage"
                                      style="animation-delay: 0.02s"
                                      >History &amp; Heritage</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="the_house_the_graff_book"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="the_house_the_graff_book"
                                      style="animation-delay: 0.04s"
                                      >The Graff Book</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="the_house_the_facet_foundation"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="the_house_the_facet_foundation"
                                      style="animation-delay: 0.06s"
                                      >The Facet Foundation</a
                                    >
                                  </li>

                                  <li
                                    class="b-header-submenu__item b-header-submenu__item-full"
                                    data-category-id="the_house_delaire_graff_estate"
                                  >
                                    <a
                                      href="/"
                                      class="b-header-submenu__link b-header-submenu__link__secondary js-header-submenu__item-link"
                                      data-category-id="the_house_delaire_graff_estate"
                                      style="animation-delay: 0.08s"
                                      >Delaire Graff Estate</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </li>
                          </div>
                          <div
                            class="l-grid__col-9-sm b-header-dropdownmenu__list__item"
                          >
                            <div
                              class="b-content-asset content-asset"
                              data-content-id="menu-thehouse__featured-banner"
                            >
                              <!-- dwMarker="content" dwContentID="fc5d0b93ff899499d5c17518a5" -->
                              <div
                                class="b-megamenu-banner b-megamenu-banner-wide"
                              >
                                <div class="b-megamenu-banner__image-holder">
                                  <img
                                    alt="Temp Alt"
                                    class="b-megamenu-banner__image hidden"
                                    loading="lazy"
                                    src="/assets/img/Megamenu_Banner_House.jpg"
                                  />
                                </div>

                                <div class="b-megamenu-banner__content">
                                  <div class="b-megamenu-banner__title">
                                    THE HOUSE
                                  </div>

                                  <div
                                    class="b-megamenu-banner__content-markup"
                                  >
                                    <span style="desktop-font-size: 13px"
                                      >For over half a century, Graff has been
                                      renowned for crafting jewels of
                                      incomparable rarity paired with boldly
                                      creative designs and unparalleled
                                      artisanship.</span
                                    >
                                  </div>

                                  <div class="b-megamenu-banner__cta-holder">
                                    <NuxtLink
                                      to="/"
                                      class="b-header-submenu__link js-header-submenu__item-link b-header-dropdownmenu__link"
                                      style="animation-delay: 0.02s"
                                      >Discover
                                    </NuxtLink>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- End content-asset -->
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <ul class="b-header-menu__list b-header-menu__list--static">
              <li class="b-header-menu__item">
                <span class="b-header-menu__link">
                  <NuxtLink
                    to="/"
                    class="b-header__icon b-header__icon-link js-header-link"
                    data-text="+44 80 8196 8325"
                  >
                    <span
                      class="b-icon b-icon--phone"
                      aria-hidden="true"
                    ></span>
                    <span class="b-header__icon-text h-dir--force-ltr"
                      >+44 80 8196 8325</span
                    >
                  </NuxtLink>
                </span>
              </li>

              <li class="b-header-menu__item">
                <span class="b-header-menu__link">
                  <NuxtLink
                    to="/"
                    class="b-header__icon b-header__icon-link js-header-link"
                    data-text="Client Services"
                  >
                    <span
                      class="b-icon b-icon--customer-service"
                      aria-hidden="true"
                    ></span>
                    <span class="b-header__icon-text">Client Services</span>
                  </NuxtLink>
                </span>
              </li>

              <li class="b-header-menu__item">
                <span class="b-header-menu__link">
                  <NuxtLink
                    to="/"
                    class="b-header__icon b-header__icon-link b-header__icon-stores js-header-link"
                    data-text="Boutiques"
                    aria-label="Boutiques"
                  >
                    <span
                      class="b-icon b-icon--locate"
                      aria-hidden="true"
                    ></span>
                    <span class="b-header__icon-text">Boutiques</span>
                  </NuxtLink>
                </span>
              </li>

              <li class="b-header-menu__item">
                <span class="b-header-menu__link">
                  <NuxtLink
                    to="/"
                    class="b-header__icon b-header__icon-link js-header-link"
                    data-text="Wishlist"
                  >
                    <span
                      class="b-icon b-icon--heart"
                      aria-hidden="true"
                    ></span>
                    <span class="b-header__icon-text">Wishlist</span>
                  </NuxtLink>
                </span>
              </li>

              <li class="b-header-menu__item">
                <span class="b-header-menu__link">
                  <NuxtLink
                    to="/"
                    class="b-header__icon b-header__icon-login js-header-link"
                    data-text="Sign In/Register"
                    aria-label="Sign In/Register"
                  >
                    <span
                      class="b-icon b-icon--account"
                      aria-hidden="true"
                    ></span>

                    <span
                      class="b-header__icon-text b-header__icon-text-logged-out"
                      >Sign In/Register</span
                    >
                  </NuxtLink>
                </span>
              </li>

              <li class="b-header-menu__item">
                <span class="b-header-menu__link">
                  <div
                    class="b-country-selector js-country-selector"
                    data-location="top"
                    data-selected-country="INT"
                    data-url="/on/demandware.store/Sites-Graff_INT-Site/en_GL/Page-SetLocale"
                  >
                    <span
                      class="b-icon b-icon--address"
                      aria-hidden="true"
                    ></span>
                    <span class="b-country-selector__label">Ship to</span>
                    <span
                      class="b-country-selector__label b-header__icon-text b-country-selector__label--menu h-hidden"
                      >Country/Region:
                    </span>
                    <span
                      class="b-country-selector__selected-country js-country-selector-selected-country"
                      >INTERNATIONAL</span
                    >
                  </div>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div class="b-header__top-promo js-header__top-promo">
          <div class="b-header__left" data-cs-mask="">
            <div
              class="b-header__icon b-header__icon-search js-header__icon-search js-header-link"
              data-text="Search"
            >
              <span class="b-icon b-icon--search" aria-hidden="true"></span>
              <span class="b-header__icon-text">What are you looking for?</span>
            </div>

            <NuxtLink
              to="/"
              class="b-header__icon b-header__icon-login js-header-link"
              data-text="Sign In/Register"
              aria-label="Sign In/Register"
            >
              <span class="b-icon b-icon--account" aria-hidden="true"></span>

              <span class="b-header__icon-text b-header__icon-text-logged-out"
                >Sign In/Register</span
              >
            </NuxtLink>
          </div>

          <div class="b-header-right b-header__right">
            <NuxtLink
              to="/"
              class="b-header__icon b-header__icon-wishlist js-header-link"
              data-text="Wishlist"
              aria-label="Wishlist"
            >
              <span class="b-icon b-icon--heart" aria-hidden="true"></span>
            </NuxtLink>

            <div class="b-header__icon b-header__icon-minicart">
              <NuxtLink
                to="/"
                class="b-minicart-toggle js-header-link js-minicart-toggle"
                data-text="View Cart"
              >
                <span class="b-icon b-icon--bag" aria-hidden="true"></span>
                <span class="sr-only">View Cart</span>
                <span
                  class="b-header__icon-count minicart-quantity js-minicart-toggle__count h-hidden"
                >
                  0
                </span>
              </NuxtLink>

              <div
                class="b-minicart js-cmp-minicart-modal m-disabled m-loaded b-modal--h-center b-modal--v-center"
                data-cmp="modal"
                data-json-config='{
                              "actionUrl": "/on/demandware.store/Sites-Graff_INT-Site/en_GL/Cart-MiniCartShow",
                              "contentTarget": "modalContent",
                              "modalToggleEl": ".js-minicart-toggle",
                              "modalToggleEvent": {"open":"mouseenter", "close":"click", "lostFocusClose":"mouseleave"},
                              "disableScroll": true,
                              "modalToggleEventLayoutModes": ["d"],
                              "overlayClose": true,
                              "focusElement": ".js-minicart-footer-checkout-btn"
                          }'
                tabindex="0"
              >
                <div class="b-modal__overlay js-modal__overlay"></div>
                <div class="b-minicart-container js-modal-content"></div>
              </div>

              <div
                class="b-modal js-modal b-modal--small b-remove-product-modal js-product-confirm-modal m-loaded b-modal--h-center b-modal--v-center"
                data-cmp="modal"
                data-json-config='{
                    "modalToggleEl": ".js-remove-modal-toggler",
                    "modalTargetEl": ".js-product-confirm-modal",
                    "overlayClose": false
                   }'
                rel="dialog"
                tabindex="-1"
              >
                <div class="b-modal__inner">
                  <div class="b-modal__overlay js-modal__overlay"></div>
                  <div class="b-modal-content">
                    <div class="b-modal-content__inner js-modal-content">
                      <span class="b-modal__close js-modal-header__close">
                        <span
                          class="b-icon b-icon--close"
                          aria-hidden="true"
                        ></span>
                      </span>
                      <div class="b-modal-header">
                        <div class="b-modal-header__logo">
                          <img
                            src="/assets/img/logo.svg"
                            alt="Graff"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div class="b-modal-body js-modal-body">
                        <div class="h-text--center">
                          <div class="b-delete-confirmation-body">
                            <div
                              class="h-text--body-lg js-remove-msg"
                              tabindex="0"
                            ></div>
                            <p
                              class="b-product-to-remove h-text--body-lg js-product-to-remove"
                              tabindex="0"
                            ></p>
                          </div>
                          <div class="b-delete-confirmation-footer">
                            <button
                              type="button"
                              class="b-btn js-modal-header__close"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              class="b-btn b-btn--type-1 js-modal-remove-btn js-modal-header__close"
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="b-modal-footer js-modal-footer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="b-header__icon b-header__icon-menu js-header__icon-menu"
            >
              <div class="b-header__icon-mobile js-header-mobile">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <main class="l-main js-main">
    <div
      class="js-error-message-holder"
      role="alert"
      aria-live="assertive"
    ></div>
    <div class="l-main__content js-main__content" id="main">
      <div class="l-experience-region">
        <div
          class="b-experience-component js-section b-experience-component--banner"
        >
          <div
            class="b-bnr js-bnr m-content-pos--default"
            data-fade-in-duration="500"
          >
            <div class="b-bnr__inner b-viewport-scroll--no-slide">
              <div class="b-bnr__image">
                <div class="b-bnr__wrapper" id="bnr-15104f8a98f478ab9dfec95d44">
                  <div
                    class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-15104f8a98f478ab9dfec95d44"
                    data-fade-in-duration="500"
                  >
                    <picture class="b-picture__el js-picture-el">
                      <source
                        srcset="
                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw5a9f3d97/Landing%20Pages/Jung%20Kook%202026/graff-homepage-jung-kook-hero-3556x2000px.jpg
                        "
                        media="(min-width: 1025px)"
                      />

                      <source
                        srcset="
                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwcd2b4019/Landing%20Pages/Jung%20Kook%202026/jung-kook-for-graff-expandable-menu-1080x1920px.jpg
                        "
                        media="(max-width: 767px)"
                      />

                      <img
                        class="b-picture__image js-picture__image"
                        src="/assets/img/jung-kook-for-graff-expandable-menu-1080x1920px.jpg"
                        alt="Image shows Graff brand ambassador Jung Kook wearing Laurence Graff Signature collection jewellery"
                        title=""
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  <NuxtLink
                    to="/"
                    class="b-link--overlay"
                    aria-label="null"
                  >
                    <span aria-hidden="true">null</span>
                  </NuxtLink>
                </div>

                <div
                  class="b-bnr__overlay-text m-overlay--pos-horizontal-center m-overlay--pos-horizontal-tablet-center m-overlay--pos-horizontal-desktop-left m-overlay--pos-vertical-bottom m-overlay--pos-vertical-tablet-center m-overlay--pos-vertical-desktop-center b-viewport-scroll--no-slide"
                  data-fade-in-duration="500"
                  style="
                    --top-mobile: 40vh;
                    --top-desktop: 20vh;
                    --left-mobile: null;
                    --left-desktop: null;
                  "
                >
                  <span class="h-pl--96__d h-pb--0__d h-pt--72__m h-pb--96__m"
                    ><p style="text-align: center">
                      <span class="h-text--body-lg h-clr--white"
                        >JEWELLERY</span
                      >
                    </p>
                    <br /><span class="h-text--h1 h-max-width--300 h-clr--white"
                      >Laurence Graff Signature</span
                    >
                    <p></p>
                    <br /><NuxtLink to="/profile" class="acsc"
                      ><button type="button">
                        <span class="b-btn--type-2"
                          ><span style="font-family: OptimaNovaLTPro"
                            >Discover</span
                          ></span
                        >
                      </button></NuxtLink
                    ></span
                  >
                  <p></p>
                </div>
              </div>

              <div
                class="b-bnr__content js-banner__content"
                data-fade-in-duration="500"
              >
                <div class="b-bnr__content-inner">
                  <div
                    data-additional-offset="0"
                    data-start-position="0"
                    class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                  ></div>
                  <div class="">
                    <div class="b-bnr__content-cta-holder h-hidden">
                      <a class="b-bnr__content-cta b-btn b-cta" href="/"
                        >discover</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="b-experience-component js-section b-experience-component--grid"
        >
          <div
            class="b-pdcmp h-pl--64__d h-pr--64__d h-pt-16__m h-pb--32__m h-pt--24__d"
          >
            <div class="l-grid b-section b-viewport-scroll--no-slide">
              <div class="b-section__titles b-viewport-scroll--no-slide"></div>
              <div class="l-grid__row">
                <div class="l-grid__col-12-d l-grid__col">
                  <div
                    class="b-carousel-container js-carousel-container h-pb--8__d h-pt--48__d h-pt--24__m b-carousel-container--fullscreen-backdrop-transparent"
                    style="
                      --arrow-top-d-num: 90;
                      --arrow-top-m-num: 90;
                      --arrow-left-d-num: 30;
                      --arrow-left-m-num: 30;
                    "
                  >
                    <div
                      class="b-carousel-container__holder js-carousel-container__holder"
                    >
                      <div
                        class="b-carousel js-carousel b-carousel--horizontal js-carousel--50397 js-carouselinitialized js-carouselhorizontal m-loaded"
                        data-cmp="carousel"
                        data-json-config='{"breakpoints":{"500":{"slidesPerView":1},"1025":{"slidesPerView":4,"spaceBetween":20},"1500":{"slidesPerView":4,"spaceBetween":20}},"loop":true,"autoplay":false,"slidesPerView":1,"spaceBetween":5,"showNavigation":true,"showPagination":true,"arrowPosition":"middle_image","paginationType":"bullets","paginationPosition":"default","direction":"horizontal"}'
                        data-arrow-prev-label=""
                        data-arrow-next-label=""
                      >
                        <div
                          class="b-carousel__slides js-carousel__slides"
                          style="
                            transform: translate3d(-1802px, 0px, 0px);
                            transition-duration: 0ms;
                          "
                        >
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate"
                            data-swiper-slide-index="4"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-e2c3bdb950c860fc1a282903ed"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-e2c3bdb950c860fc1a282903ed"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw0a4bdef7/Homepage%20Images/March_24/Laurence_Graff_Signature_Bangle_RGB605_3000x3000px.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/Laurence_Graff_Signature_Bangle_RGB605_3000x3000px.png"
                                          alt="Laurence Graff Signature Bangle"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Laurence Graff Signature Bangle</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate"
                            data-swiper-slide-index="5"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-8ecdb84742c09e46d4614b4c63"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-8ecdb84742c09e46d4614b4c63"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwcea80696/Homepage%20Images/March_24/Laurence_Graff_Signature_Bangle_RGB602_3000x3000px.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/Laurence_Graff_Signature_Bangle_RGB602_3000x3000px.png"
                                          alt="Laurence Graff Signature Diamond Bangle"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Laurence Graff Signature Diamond
                                          Bangle</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate"
                            data-swiper-slide-index="6"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-689712126a86f97aba73de3122"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-689712126a86f97aba73de3122"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwbdd28d64/Homepage%20Images/March_24/Laurence_Graff_Signature_Bangle_RGB604_3000x3000px.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/Laurence_Graff_Signature_Bangle_RGB604_3000x3000px.png"
                                          alt="Laurence Graff Signature Diamond Bangle"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Laurence Graff Signature Diamond
                                          Bangle</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate b-carousel__slide--prev"
                            data-swiper-slide-index="7"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-283f7c071204941af7dfddf9a1"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-283f7c071204941af7dfddf9a1"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwe6ccca00/Homepage%20Images/Product/RGB694-170_GB19720_Hero_1V2.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/RGB694-170_GB19720_Hero_1V2.png"
                                          alt="Laurence Graff Signature Pavé Diamond Bangle"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Laurence Graff Signature Pavé Diamond
                                          Bangle</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide m-active"
                            data-swiper-slide-index="0"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-4ab1af849caa6097629bc29a16"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-4ab1af849caa6097629bc29a16"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw20702d59/Homepage%20Images/Product/RGR1084_GR210402_Hero.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/RGR1084_GR210402_Hero.png"
                                          alt="Triple Butterfly Sapphire, Paraiba Tourmaline and Diamond Ring"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Laurence Graff Signature Three-Row
                                          Ring</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide b-carousel__slide--next"
                            data-swiper-slide-index="1"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-792e9b84a442c978ade87f8e4f"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-792e9b84a442c978ade87f8e4f"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwd0fb9684/Homepage%20Images/Product/Laurence%20Graff%20Signature%20Diamond%20Ring%20WHITE%20GOLD%20(3.2MM)%20RGR449V2.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/Laurence Graff Signature Diamond Ring WHITE GOLD (3.2MM) RGR449V2.png"
                                          alt="Laurence Graff Signature Small Chain Pendant"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Laurence Graff Signature Diamond
                                          Band</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--banner"
        >
          <div
            class="b-bnr js-bnr l-container m-content-pos--default h-pt--8__d h-pt--0__m h-pb--40__d h-pb--48__m"
            data-fade-in-duration="500"
          >
            <div
              class="b-bnr__inner b-viewport-scroll"
              style="transition-duration: 0.5s"
            >
              <div
                class="b-bnr__content js-banner__content h-px--96__d h-px--16__m"
                data-fade-in-duration="500"
              >
                <div class="b-bnr__content-inner">
                  <div
                    data-additional-offset="0"
                    data-start-position="0"
                    class="b-bnr__content-markup-field"
                  >
                    <p></p>
                    <p class="h-text--center">
                      <span style="text-decoration: underline"
                        ><NuxtLink to="/"
                          ><button type="button">
                            <span class="b-btn--type-1">Curate Your Stack</span>
                          </button></NuxtLink
                        ></span
                      >
                    </p>
                  </div>
                  <div class=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--grid"
        >
          <div class="b-pdcmp h-pt--16__d h-pb--56__d h-pt--16__d l-container">
            <div
              class="l-grid b-section b-viewport-scroll"
              data-fade-in-duration="500"
              style="transition-duration: 0.5s"
            >
              <div class="b-section__titles"></div>
              <div class="l-grid__row">
                <div class="l-grid__col-12 l-grid__col-6-d">
                  <div
                    class="b-bnr js-bnr m-content-pos--default h-pt--32__d h-pb--40__m"
                    data-fade-in-duration="500"
                  >
                    <div class="b-bnr__inner">
                      <div class="h-pb--16__d h-pb--32__m">
                        <div class="w-full h-full">
                          <img class="w-full h-full"
                            src="https://cf-images.eu-west-1.prod.boltdns.net/v1/jit/5463980149001/5cd9c2ba-7559-46cc-9d82-c1329057711c/main/1280x720/7s8ms/match/image.jpg"
                          />
                        </div>
                      </div>

                      <div
                        class="b-bnr__content js-banner__content"
                        data-fade-in-duration="500"
                      >
                        <div class="b-bnr__content-inner">
                          <div
                            data-additional-offset="0"
                            data-start-position="0"
                            class="b-bnr__content-markup-field"
                          >
                            <p class="h-text--center">
                              <span class="h-text--h1"
                                >A Sculptural Gold Signature</span
                              ><br />
                            </p>
                            <p class="h-text--center">
                              <span class="h-text--body-lg"
                                >Explore necklaces and pendants in the purest
                                gold that pay homage to the timelessness of
                                diamonds.</span
                              >
                            </p>
                            <p class="h-text--center">
                              <span style="text-decoration: underline"
                                ><NuxtLink to="/"
                                  ><button type="button">
                                    <span class="b-btn--type-1">Shop Now</span>
                                  </button></NuxtLink
                                ></span
                              >
                            </p>
                          </div>
                          <div class="">
                            <div class="b-bnr__content-cta-holder">
                              <a
                                class="b-bnr__content-cta b-btn b-cta h-hidden"
                                href="/profile"
                                >Discover</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="l-grid__col-12 l-grid__col-6-d">
                  <div
                    class="b-bnr js-bnr m-content-pos--default h-pt--32__d h-pb--40__m"
                    data-fade-in-duration="500"
                  >
                    <div class="b-bnr__inner">
                      <div class="b-bnr__image h-pb--16__d h-pb--32__m">
                        <div
                          class="b-bnr__wrapper"
                          id="bnr-a779590d0c2f86766e97e5b758"
                        >
                          <div
                            class="b-picture b-bnr__picture picture-a779590d0c2f86766e97e5b758"
                            data-fade-in-duration="500"
                          >
                            <picture class="b-picture__el js-picture-el">
                              <source
                                srcset="
                                  https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw08a9c4ba/Homepage%20Images/June_26/homepage4x5bangleV3.jpg
                                "
                                media="(max-width: 767px)"
                              />

                              <img
                                class="b-picture__image js-picture__image"
                                src="/assets/img/homepage4x5bangleV3.jpg"
                                alt="Bracelets and Bangles - image shows Laurence Graff Signature bangles"
                                title=""
                                loading="lazy"
                              />
                            </picture>
                          </div>

                          <NuxtLink
                            to="/"
                            class="b-link--overlay"
                            aria-label="null"
                          >
                            <span aria-hidden="true">null</span>
                          </NuxtLink>
                        </div>
                      </div>

                      <div
                        class="b-bnr__content js-banner__content"
                        data-fade-in-duration="500"
                      >
                        <div class="b-bnr__content-inner">
                          <div
                            data-additional-offset="0"
                            data-start-position="0"
                            class="b-bnr__content-markup-field"
                          >
                            <p class="h-text--center">
                              <span class="h-text--h1"
                                >Goldwear Born of a Diamond</span
                              ><br />
                            </p>
                            <p class="h-text--center">
                              <span class="h-text--body-lg"
                                >Explore the unmistakable faceted silhouette of
                                Laurence Graff Signature through sleek bracelets
                                and bangles, designed for stacking.&nbsp;</span
                              >
                            </p>
                            <p class="h-text--center">
                              <span style="text-decoration: underline"
                                ><NuxtLink to="/"
                                  ><button type="button">
                                    <span class="b-btn--type-1">Shop Now</span>
                                  </button></NuxtLink
                                ></span
                              >
                            </p>
                          </div>
                          <div class="">
                            <div class="b-bnr__content-cta-holder">
                              <a
                                class="b-bnr__content-cta b-btn b-cta h-hidden"
                                href="/"
                                >Discover</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--grid"
        >
          <div class="b-pdcmp">
            <div
              class="l-grid b-section b-viewport-scroll--no-slide b-parallax__grid b-parallax__type-multiple-layered js-parallax__grid js-parallax__type-multiple-layered"
            >
              <div class="b-section__titles b-viewport-scroll--no-slide"></div>
              <div class="l-grid__row">
                <div class="b-parallax__container__items">
                  <div class="pin-spacer">
                    <div
                      class="b-parallax__container js-parallax__container"
                      data-parallax-config="undefined"
                    >
                      <div class="b-parallax__container__items">
                        <div
                          class="experience-component experience-commerce_assets-banner"
                        >
                          <div
                            class="b-bnr js-bnr m-content-pos--default"
                            data-fade-in-duration="500"
                          >
                            <div
                              class="b-bnr__inner b-viewport-scroll--no-slide"
                            >
                              <div class="b-bnr__image">
                                <div
                                  class="b-bnr__wrapper"
                                  id="bnr-12ec866626c070ce33cd3ad609"
                                >
                                  <div
                                    class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-12ec866626c070ce33cd3ad609"
                                    data-fade-in-duration="500"
                                  >
                                    <picture
                                      class="b-picture__el js-picture-el"
                                    >
                                      <source
                                        srcset="
                                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwda25ed4b/Homepage%20Images/June_26/solitaireringv2.jpg
                                        "
                                        media="(min-width: 1025px)"
                                      />

                                      <source
                                        srcset="
                                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw0d08436f/Homepage%20Images/June_26/GR245610_001%209x16V2.jpg
                                        "
                                        media="(max-width: 767px)"
                                      />

                                      <img
                                        class="b-picture__image js-picture__image"
                                        src="/assets/img/GR245610_001 9x16V2.jpg"
                                        alt="image shows models wearing Graff diamond bridal jewellery"
                                        title=""
                                        loading="lazy"
                                      />
                                    </picture>
                                  </div>

                                  <NuxtLink
                                    to="/"
                                    class="b-link--overlay"
                                    aria-label="null"
                                  >
                                    <span aria-hidden="true">null</span>
                                  </NuxtLink>
                                </div>

                                <div
                                  class="b-bnr__overlay-text m-overlay--pos-horizontal-center m-overlay--pos-horizontal-tablet-default m-overlay--pos-horizontal-desktop-left m-overlay--pos-vertical-bottom m-overlay--pos-vertical-tablet-default m-overlay--pos-vertical-desktop-center b-viewport-scroll--no-slide"
                                  data-fade-in-duration="500"
                                  style="
                                    --top-mobile: 35vh;
                                    --top-desktop: 20vh;
                                    --left-mobile: null;
                                    --left-desktop: null;
                                  "
                                >
                                  <span
                                    class="h-pl--64__d h-pt--0__d h-pt--96__m h-pb--96__d h-pb--0__d h-pb--80__m"
                                    ><p style="text-align: center">
                                      <span class="h-text--body-lg h-clr--white"
                                        >ENGAGEMENT &amp; BRIDAL</span
                                      >
                                    </p>
                                    <br /><span
                                      class="h-text--h1 h-max-width--200 h-clr--white"
                                      >Engagement Rings</span
                                    >
                                    <p></p>
                                    <br /><NuxtLink to="/"
                                      ><button type="button">
                                        <span class="b-btn--type-2"
                                          ><span
                                            style="font-family: OptimaNovaLTPro"
                                            >Shop Now</span
                                          ></span
                                        >
                                      </button></NuxtLink
                                    ></span
                                  >
                                  <p></p>
                                </div>
                              </div>

                              <div
                                class="b-bnr__content js-banner__content"
                                data-fade-in-duration="500"
                              >
                                <div class="b-bnr__content-inner">
                                  <div
                                    data-additional-offset="0"
                                    data-start-position="0"
                                    class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                  ></div>
                                  <div class="">
                                    <div
                                      class="b-bnr__content-cta-holder h-hidden"
                                    >
                                      <a
                                        class="b-bnr__content-cta b-btn b-cta"
                                        href="/"
                                        >discover</a
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="b-parallax__container__items">
                  <div
                    class="b-parallax__container js-parallax__container"
                    style="align-items: center"
                    data-parallax-config="undefined"
                  >
                    <div class="b-parallax__container__items"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--parallaxContainer anim-parallax-next-section"
        >
          <div
            class="b-parallax__container js-parallax__container"
            style="align-items: flex-start"
            data-parallax-config="undefined"
          >
            <div class="b-parallax__container__items">
              <div
                class="experience-component experience-commerce_assets-banner"
              >
                <div
                  class="b-bnr js-bnr m-content-pos--default"
                  data-fade-in-duration="500"
                >
                  <div class="b-bnr__inner b-viewport-scroll--no-slide">
                    <div class="b-bnr__image">
                      <div
                        class="b-bnr__wrapper"
                        id="bnr-ff37d592ffd6cd6bd780267b05"
                      >
                        <div
                          class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-ff37d592ffd6cd6bd780267b05"
                          data-fade-in-duration="500"
                        >
                          <picture class="b-picture__el js-picture-el">
                            <source
                              srcset="
                                https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw79ed1e2e/Homepage%20Images/June_26/solitairependantsv3.jpg
                              "
                              media="(min-width: 1025px)"
                            />

                            <source
                              srcset="
                                https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw24095e60/Homepage%20Images/June_26/solitairependantsvmobile.jpg
                              "
                              media="(max-width: 767px)"
                            />

                            <img
                              class="b-picture__image js-picture__image"
                              src="../../public/assets/img/solitairependantsvmobile.jpg"
                              alt="Laurence Graff Signature - image shows models wearing Laurence Graff Signature collection jewellery"
                              title=""
                              loading="lazy"
                            />
                          </picture>
                        </div>

                        <NuxtLink
                          to="/"
                          class="b-link--overlay"
                          aria-label="null"
                        >
                          <span aria-hidden="true">null</span>
                        </NuxtLink>
                      </div>

                      <div
                        class="b-bnr__overlay-text m-overlay--pos-horizontal-center m-overlay--pos-horizontal-tablet-default m-overlay--pos-horizontal-desktop-left m-overlay--pos-vertical-bottom m-overlay--pos-vertical-tablet-default m-overlay--pos-vertical-desktop-center b-viewport-scroll--no-slide"
                        data-fade-in-duration="500"
                        style="
                          --top-mobile: 50vh;
                          --top-desktop: 20vh;
                          --left-mobile: null;
                          --left-desktop: null;
                        "
                      >
                        <span
                          class="h-pl--72__d h-pb--96__d h-pt--0__m h-pt--104__d h-pb--80__m"
                          ><p style="text-align: center">
                            <span class="h-text--body-lg h-clr--black"
                              >JEWELLERY</span
                            >
                          </p>
                          <br /><span
                            class="h-text--h1 h-max-width--400 h-clr--black"
                            >Diamond Pendants</span
                          >
                          <p></p>
                          <br /><NuxtLink to="/"
                            ><button type="button">
                              <span class="b-btn--type-2"
                                ><span style="font-family: OptimaNovaLTPro"
                                  >Shop Now</span
                                ></span
                              >
                            </button></NuxtLink
                          ></span
                        >
                        <p></p>
                      </div>
                    </div>

                    <div
                      class="b-bnr__content js-banner__content"
                      data-fade-in-duration="500"
                    >
                      <div class="b-bnr__content-inner">
                        <div
                          data-additional-offset="0"
                          data-start-position="0"
                          class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                        ></div>
                        <div class="">
                          <div class="b-bnr__content-cta-holder h-hidden">
                            <NuxtLink
                              class="b-bnr__content-cta b-btn b-cta"
                              to="/"
                              >discover</NuxtLink
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--grid"
        >
          <div class="b-pdcmp h-pt-32__m h-pb--32__m h-pt--24__d">
            <div class="l-grid b-section b-viewport-scroll--no-slide">
              <div class="b-section__titles b-viewport-scroll--no-slide"></div>
              <div class="l-grid__row">
                <div class="l-grid__col-12-d l-grid__col">
                  <div
                    class="b-carousel-container js-carousel-container h-pl--64__d h-pr--64__d h-pb--8__d h-pt--48__d h-pt--24__m b-carousel-container--fullscreen-backdrop-transparent"
                    style="
                      --arrow-top-d-num: 90;
                      --arrow-top-m-num: 90;
                      --arrow-left-d-num: 30;
                      --arrow-left-m-num: 30;
                    "
                  >
                    <div
                      class="b-carousel-container__holder js-carousel-container__holder"
                    >
                      <div
                        class="b-carousel js-carousel b-carousel--horizontal js-carousel--77460 js-carouselinitialized js-carouselhorizontal m-loaded"
                        data-cmp="carousel"
                        data-json-config='{"breakpoints":{"500":{"slidesPerView":1},"1025":{"slidesPerView":4,"spaceBetween":20},"1500":{"slidesPerView":4,"spaceBetween":20}},"loop":true,"autoplay":false,"slidesPerView":1,"spaceBetween":5,"showNavigation":true,"showPagination":true,"arrowPosition":"middle_image","paginationType":"bullets","paginationPosition":"default","direction":"horizontal"}'
                        data-arrow-prev-label=""
                        data-arrow-next-label=""
                      >
                        <div
                          class="b-carousel__slides js-carousel__slides"
                          style="
                            transform: translate3d(-1802px, 0px, 0px);
                            transition-duration: 0ms;
                          "
                        >
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate"
                            data-swiper-slide-index="6"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-ba9d260541bbb58f77f1149d0f"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-ba9d260541bbb58f77f1149d0f"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw909cf4a2/Homepage%20Images/October_2025/PPN01_Web.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/PPN01_Web.png"
                                          alt="Pear Shape Diamond Solitaire Pendant"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Pear Shape Diamond Solitaire
                                          Pendant</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate"
                            data-swiper-slide-index="7"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-e22f75ebe18e111807fbd91a3e"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-e22f75ebe18e111807fbd91a3e"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw2ea4536d/Homepage%20Images/October_2025/PTSW01_GE61263_Hero.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/PTSW01_GE61263_Hero.png"
                                          alt="Pear Shape Diamond Solitaire Earrings"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Pear Shape Diamond Solitaire
                                          Earrings</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate"
                            data-swiper-slide-index="8"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-5f022e8ca027612f69109452dd"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-5f022e8ca027612f69109452dd"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw776a3990/Homepage%20Images/July_25/RGB627_GB18094_Hero_1.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/RGB627_GB18094_Hero_1.png"
                                          alt="Oval Cut Diamond Bracelet"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Oval Cut Diamond Bracelet</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide swiper-slide-duplicate b-carousel__slide--prev"
                            data-swiper-slide-index="9"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-bae82518b6219281f542aefa23"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-bae82518b6219281f542aefa23"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw05be450f/Homepage%20Images/Product/RER1054_GR170668_Hero.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/RER1054_GR170668_Hero.png"
                                          alt="Shared Claw Oval Diamond Wedding Band"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Shared Claw Oval Diamond Wedding
                                          Band</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide m-active"
                            data-swiper-slide-index="0"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-594f5992e896a4e3e58ecd6105"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-594f5992e896a4e3e58ecd6105"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwdb9b8a81/Homepage%20Images/May_25/EPN01_GP68224_Hero.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/EPN01_GP68224_Hero.png"
                                          alt="Emerald Diamond Necklace"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Emerald Cut Diamond Pendant</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="b-carousel__slide js-carousel__slide b-carousel__slide--next"
                            data-swiper-slide-index="1"
                            style="width: 430.5px; margin-right: 20px"
                          >
                            <div
                              class="b-bnr js-bnr m-content-pos--default h-pb--32__d h-pb--32__m b-bnr--zoom"
                              data-fade-in-duration="500"
                            >
                              <div
                                class="b-bnr__inner b-viewport-scroll--no-slide"
                              >
                                <div
                                  class="b-bnr__image h-pb--16__m h-pb--32__d"
                                >
                                  <div
                                    class="b-bnr__wrapper"
                                    id="bnr-74f1c6ea50a77169a75b058ab5"
                                  >
                                    <div
                                      class="b-picture b-bnr__picture b-viewport-scroll--no-slide picture-74f1c6ea50a77169a75b058ab5"
                                      data-fade-in-duration="500"
                                    >
                                      <picture
                                        class="b-picture__el js-picture-el"
                                      >
                                        <source
                                          srcset="
                                            https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw51a2a31b/Homepage%20Images/Product/RGB673_GB22545_Hero.png
                                          "
                                          media="(max-width: 767px)"
                                        />

                                        <img
                                          class="b-picture__image js-picture__image"
                                          src="/assets/img/RGB673_GB22545_Hero.png"
                                          alt="Emerald Cut Diamond Line Bracelet"
                                          title=""
                                          loading="lazy"
                                        />
                                      </picture>
                                    </div>

                                    <NuxtLink
                                      to="/"
                                      class="b-link--overlay"
                                      aria-label="null"
                                    >
                                      <span aria-hidden="true">null</span>
                                    </NuxtLink>
                                  </div>
                                </div>

                                <div
                                  class="b-bnr__content js-banner__content"
                                  data-fade-in-duration="500"
                                >
                                  <div class="b-bnr__content-inner">
                                    <div
                                      data-additional-offset="0"
                                      data-start-position="0"
                                      class="b-bnr__content-markup-field b-viewport-scroll--no-slide"
                                    >
                                      <p style="text-align: center">
                                        <span class="h-text--h1-h2"
                                          >Emerald Cut Diamond Line
                                          Bracelet</span
                                        >
                                      </p>
                                    </div>
                                    <div class="">
                                      <div class="b-bnr__content-cta-holder">
                                        <a
                                          class="b-bnr__content-cta b-btn b-cta h-hidden"
                                          href="/"
                                          >Shop Now</a
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--banner"
        >
          <div
            class="b-bnr js-bnr l-container m-content-pos--default h-pt--8__d h-pt--0__m h-pb--40__d h-pb--48__m"
            data-fade-in-duration="500"
          >
            <div
              class="b-bnr__inner b-viewport-scroll"
              style="transition-duration: 0.5s"
            >
              <div
                class="b-bnr__content js-banner__content h-px--96__d h-px--16__m"
                data-fade-in-duration="500"
              >
                <div class="b-bnr__content-inner">
                  <div
                    data-additional-offset="0"
                    data-start-position="0"
                    class="b-bnr__content-markup-field"
                  >
                    <p></p>
                    <p class="h-text--center">
                      <span style="text-decoration: underline"
                        ><NuxtLink to="/"
                          ><button type="button">
                            <span class="b-btn--type-1">Shop Now</span>
                          </button></NuxtLink
                        ></span
                      >
                    </p>
                  </div>
                  <div class=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--banner"
        >
          <div
            class="b-bnr js-bnr m-content-pos--sideright h-pb--56__d h-pb--8__m h-pt--56__d"
            data-fade-in-duration="500"
          >
            <div class="b-bnr__inner">
              <div
                class="b-bnr__image h-pl--16__m h-pr--16__m h-pl--96__d h-pb--0__m l-grid__col-7-d"
              >
                <div class="b-bnr__wrapper" id="bnr-a3be0158ca4c5cec11a6359b2d">
                  <div
                    class="b-picture b-bnr__picture b-viewport-scroll picture-a3be0158ca4c5cec11a6359b2d"
                    data-fade-in-duration="500"
                    style="transition-duration: 0.5s"
                  >
                    <picture class="b-picture__el js-picture-el">
                      <source
                        srcset="
                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwbdf8355e/Homepage%20Images/June_26/Classics%20Look%20Model%2016x9v2.jpg
                        "
                        media="(min-width: 1025px)"
                      />

                      <source
                        srcset="
                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw0a009293/Homepage%20Images/June_26/Classics%20Look%20Model%204x5.jpg
                        "
                        media="(max-width: 767px)"
                      />

                      <img
                        class="b-picture__image js-picture__image"
                        src="/assets/img/Classics Look Model 4x5.jpg"
                        alt="Classic Graff - image shows model wearing Classic Graff Diamond Jewellery"
                        title=""
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  <NuxtLink
                    class="b-link--overlay"
                    to="/"
                    aria-label="null"
                  >
                    <span aria-hidden="true">null</span>
                  </NuxtLink>
                </div>
              </div>

              <div
                class="b-bnr__content js-banner__content"
                data-fade-in-duration="500"
              >
                <div class="b-bnr__content-inner h-pl--16__d">
                  <div
                    data-additional-offset="0"
                    data-start-position="0"
                    class="b-bnr__content-markup-field b-viewport-scroll"
                    style="transition-duration: 0.5s"
                  >
                    <p class="h-text--center__m">
                      <span class="h-text--h1">Classic Graff</span><br />
                    </p>
                    <p class="h-text--center__m">
                      <span class="h-text--body-lg"
                        >At Graff, every jewellery creation stands as a
                        testament to flawless radiance, breathtaking beauty and
                        unrivalled desirability.
                      </span>
                    </p>
                    <p class="h-text--center__m">
                      <span
                        ><NuxtLink to="/"
                          ><span class="b-btn--type-1">Shop Now</span></NuxtLink
                        ></span
                      >
                    </p>
                  </div>
                  <div class="">
                    <div class="b-bnr__content-cta-holder">
                      <a
                        class="b-bnr__content-cta b-btn b-cta h-hidden"
                        href="/"
                        >Shop Now</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--banner"
        >
          <div
            class="b-bnr js-bnr m-content-pos--sideleft h-pb--56__d h-pb--8__m h-pt--56__d"
            data-fade-in-duration="500"
          >
            <div class="b-bnr__inner">
              <div
                class="b-bnr__image h-pl--16__m h-pr--16__m h-pr--96__d h-pb--0__m l-grid__col-7-d"
              >
                <div class="b-bnr__wrapper" id="bnr-d7b2537053d03f4c9c035efd7d">
                  <div
                    class="b-picture b-bnr__picture b-viewport-scroll picture-d7b2537053d03f4c9c035efd7d"
                    data-fade-in-duration="500"
                    style="transition-duration: 0.5s"
                  >
                    <picture class="b-picture__el js-picture-el">
                      <source
                        srcset="
                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwcba98b0a/Homepage%20Images/June_26/solitairearrings.jpg
                        "
                        media="(min-width: 1025px)"
                      />

                      <source
                        srcset="
                          https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw549f2d7f/Homepage%20Images/June_26/Classic%20Diamonds%20PTSW01%204x5.jpg
                        "
                        media="(max-width: 767px)"
                      />

                      <img
                        class="b-picture__image js-picture__image"
                        src="/assets/img/Classic Diamonds PTSW01 4x5.jpg"
                        alt="Image shows Classic Graff Diamond Earrings"
                        title=""
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  <NuxtLink
                    class="b-link--overlay"
                    to="/"
                    aria-label="null"
                  >
                    <span aria-hidden="true">null</span>
                  </NuxtLink>
                </div>
              </div>

              <div
                class="b-bnr__content js-banner__content h-text--left"
                data-fade-in-duration="500"
              >
                <div class="b-bnr__content-inner h-pl--16__d">
                  <div
                    data-additional-offset="0"
                    data-start-position="0"
                    class="b-bnr__content-markup-field b-viewport-scroll"
                    style="transition-duration: 0.5s"
                  >
                    <p class="h-text--center__m">
                      <span class="h-text--h1">Diamond Earrings</span><br />
                    </p>
                    <p class="h-text--center__m">
                      <span class="h-text--body-lg"
                        >Showcasing classic and contemporary designs, diamond
                        earrings from Graff are endlessly elegant, with refined
                        silhouettes that allow each solitaire to scintillate and
                        shine.</span
                      >
                    </p>
                    <p class="h-text--center__m">
                      <span
                        ><NuxtLink to="/"
                          ><span class="b-btn--type-1">SHOP NOW</span></NuxtLink
                        ></span
                      >
                    </p>
                  </div>
                  <div class="">
                    <div class="b-bnr__content-cta-holder">
                      <NuxtLink
                        class="b-bnr__content-cta b-btn b-cta h-hidden"
                        to="/"
                        >Shop now</NuxtLink
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="b-experience-component js-section b-experience-component--grid"
        >
          <div class="b-pdcmp h-pt--48__d h-pt--16__m l-container">
            <div class="l-grid b-section b-viewport-scroll--no-slide">
              <div class="b-section__titles b-viewport-scroll--no-slide">
                <div class="b-section__title">The House of Graff</div>

                <div class="b-section__subtitle h-text--h3">Featured</div>
              </div>
              <div class="l-grid__row">
                <div class="l-grid__col-4-d l-grid__col">
                  <div
                    class="b-bnr js-bnr m-content-pos--default h-pb--40__d h-pb--0__m"
                    data-fade-in-duration="500"
                  >
                    <div class="b-bnr__inner">
                      <div class="b-bnr__image h-my--16">
                        <div
                          class="b-bnr__wrapper"
                          id="bnr-34e133defd53a9d114c1e2ca46"
                        >
                          <div
                            class="b-picture b-bnr__picture b-viewport-scroll picture-34e133defd53a9d114c1e2ca46"
                            data-fade-in-duration="300"
                          >
                            <picture class="b-picture__el js-picture-el">
                              <source
                                srcset="
                                  https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dw2895017a/Homepage%20Images/August_26/crafting-an-icon-1398x789px.jpg
                                "
                                media="(max-width: 767px)"
                              />

                              <img
                                class="b-picture__image js-picture__image"
                                src="/assets/img/crafting-an-icon-1398x789px.jpg"
                                alt="Crafting an Icon - image shows Laurence Graff Signature collection jewellery and workshop tools"
                                title=""
                                loading="lazy"
                              />
                            </picture>
                          </div>

                          <NuxtLink
                            class="b-link--overlay"
                            to="/"
                            aria-label="null"
                          >
                            <span aria-hidden="true">null</span>
                          </NuxtLink>
                        </div>
                      </div>

                      <div
                        class="b-bnr__content js-banner__content"
                        data-fade-in-duration="300"
                      >
                        <div class="b-bnr__content-inner">
                          <div
                            data-additional-offset="0"
                            data-start-position="0"
                            class="b-bnr__content-markup-field b-viewport-scroll"
                            style="transition-duration: 0.3s"
                          >
                            <p style="text-align: center">
                              <span class="h-text--h1-sm">Crafting an Icon</span
                              ><br />
                            </p>
                            <p style="text-align: center">
                              <span class="h-text--body-lg"></span>
                            </p>
                            <p style="text-align: center">
                              <span class="h-text--body-lg"
                                >Discover the extraordinary craftsmanship behind
                                the Laurence Graff Signature
                                collection.&nbsp;</span
                              >
                            </p>
                            <p style="text-align: center">
                              <span style="text-decoration: underline"
                                ><NuxtLink to="/"
                                  ><button type="button">
                                    <span class="b-btn--type-1">DISCOVER</span>
                                  </button></NuxtLink
                                ></span
                              >
                            </p>
                          </div>
                          <div class="">
                            <div class="b-bnr__content-cta-holder">
                              <a
                                class="b-bnr__content-cta b-btn b-cta h-hidden"
                                href="/"
                                >Discover</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="l-grid__col-4-d l-grid__col">
                  <div
                    class="b-bnr js-bnr m-content-pos--default h-pb--40__d h-pb--0__m"
                    data-fade-in-duration="500"
                    data-slide-start-position="300"
                  >
                    <div class="b-bnr__inner">
                      <div class="b-bnr__image h-my--16">
                        <div
                          class="b-bnr__wrapper"
                          id="bnr-d6bf8cfa57ca260638f918e8b8"
                        >
                          <div
                            class="b-picture b-bnr__picture b-viewport-scroll picture-d6bf8cfa57ca260638f918e8b8"
                            data-fade-in-duration="300"
                            style="transition-duration: 0.3s"
                          >
                            <picture class="b-picture__el js-picture-el">
                              <source
                                srcset="
                                  https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwfbc1f780/Homepage%20Images/July_25/book-an-appointment-1398x789px.jpg
                                "
                                media="(max-width: 767px)"
                              />

                              <img
                                class="b-picture__image js-picture__image"
                                src="/assets/img/book-an-appointment-1398x789px.jpg"
                                alt="Graff boutique"
                                title=""
                                loading="lazy"
                              />
                            </picture>
                          </div>

                          <NuxtLink
                            class="b-link--overlay"
                            to="/"
                            aria-label="null"
                          >
                            <span aria-hidden="true">null</span>
                          </NuxtLink>
                        </div>
                      </div>

                      <div
                        class="b-bnr__content js-banner__content"
                        data-fade-in-duration="300"
                      >
                        <div class="b-bnr__content-inner">
                          <div
                            data-additional-offset="0"
                            data-start-position="0"
                            class="b-bnr__content-markup-field b-viewport-scroll"
                            style="transition-duration: 0.3s"
                          >
                            <p style="text-align: center">
                              <span class="h-text--h1-sm"
                                >Book an Appointment</span
                              ><br />
                            </p>
                            <p style="text-align: center">
                              <span class="h-text--body-lg"></span>
                            </p>
                            <p style="text-align: center">
                              <span class="h-text--body-lg"
                                >Discover our exemplary jewellery creations at
                                your nearest Graff boutique.</span
                              >
                            </p>
                            <p style="text-align: center">
                              <span style="text-decoration: underline"
                                ><NuxtLink to="/"
                                  ><button type="button">
                                    <span class="b-btn--type-1">DISCOVER</span>
                                  </button></NuxtLink
                                ></span
                              >
                            </p>
                          </div>
                          <div class="">
                            <div class="b-bnr__content-cta-holder">
                              <a
                                class="b-bnr__content-cta b-btn b-cta h-hidden"
                                href="/"
                                >Discover</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="l-grid__col-4-d l-grid__col">
                  <div
                    class="b-bnr js-bnr m-content-pos--default h-pb--40__d h-pb--16__m"
                    data-fade-in-duration="500"
                  >
                    <div class="b-bnr__inner">
                      <div class="b-bnr__image h-my--16">
                        <div
                          class="b-bnr__wrapper"
                          id="bnr-97fdb8ac0520ce1bb50c1c371e"
                        >
                          <div
                            class="b-picture b-bnr__picture b-viewport-scroll picture-97fdb8ac0520ce1bb50c1c371e"
                            data-fade-in-duration="300"
                            style="transition-duration: 0.3s"
                          >
                            <picture class="b-picture__el js-picture-el">
                              <source
                                srcset="
                                  https://www.graff.com/dw/image/v2/BFNT_PRD/on/demandware.static/-/Library-Sites-GraffSharedLibrary/default/dwbcb798bc/Homepage%20Images/March_26/unique-solitaires-footer-1398x789px.jpg
                                "
                                media="(max-width: 767px)"
                              />

                              <img
                                class="b-picture__image js-picture__image"
                                src="/assets/img/unique-solitaires-footer-1398x789px.jpg"
                                alt="Image of Orbit in Shanghai where 65th Anniversary Graff exhibition took place "
                                title=""
                                loading="lazy"
                              />
                            </picture>
                          </div>

                          <NuxtLink
                            class="b-link--overlay"
                            to="/"
                            aria-label="null"
                          >
                            <span aria-hidden="true">null</span>
                          </NuxtLink>
                        </div>
                      </div>

                      <div
                        class="b-bnr__content js-banner__content"
                        data-fade-in-duration="300"
                      >
                        <div class="b-bnr__content-inner">
                          <div
                            data-additional-offset="0"
                            data-start-position="0"
                            class="b-bnr__content-markup-field b-viewport-scroll"
                            style="transition-duration: 0.3s"
                          >
                            <p style="text-align: center">
                              <span class="h-text--h1-sm"
                                >Unique Solitaires</span
                              ><br />
                            </p>
                            <p style="text-align: center">
                              <span class="h-text--body-lg"></span>
                            </p>
                            <p style="text-align: center">
                              <span class="h-text--body-lg"
                                >Discover exceptional high jewellery creations
                                thoughtfully designed and expertly crafted by
                                Graff’s master artisans.</span
                              >
                            </p>
                            <p style="text-align: center">
                              <span style="text-decoration: underline"
                                ><NuxtLink to="/"
                                  ><button type="button">
                                    <span class="b-btn--type-1">DISCOVER</span>
                                  </button></NuxtLink
                                ></span
                              >
                            </p>
                          </div>
                          <div class="">
                            <div class="b-bnr__content-cta-holder">
                              <NuxtLink
                                class="b-bnr__content-cta b-btn b-cta h-hidden"
                                to="/"
                                >Discover</NuxtLink
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer class="b-footer" id="footercontent">
    <div class="b-footer-top">
      <div class="l-container">
        <p
          class="h-text--h1 b-linear-form-headling b-footer-top__headline b-heading--brand-newsletter"
        >
          Subscribe to our newsletter
        </p>
        <form class="b-form b-linear-form js-newslettersubscribe-toggle-form">
          <label
            class="b-linear-form__label"
            for="footer-subscribe"
            aria-label="Discover the latest collections, news and exclusive launches from the House of Graff: Enter your email address"
            >Discover the latest collections, news and exclusive launches from
            the House of Graff:</label
          >
          <div class="b-field m-required">
            <input
              type="text"
              class="b-textinput b-field__el js-newslettersubscribe-input"
              id="footer-subscribe"
              name="footer-subscribe"
              placeholder="E-mail address"
              value=""
            />

            <button class="b-btn js-newslettersubscribe-toggle" type="button">
              <span class="b-btn__text">Sign Up</span>
            </button>
            <div class="b-field__error js-field__error" role="alert"></div>
          </div>
        </form>
      </div>
    </div>
    <div class="b-footer-bottom">
      <div
        class="b-content-asset content-asset"
        data-content-id="footer-social"
      >
        <div class="b-footer-social">
          <NuxtLink
            to="/"
            class="b-footer-social__link"
            target="_blank"
            aria-label="graff facebook page"
            rel="nofollow noopener noreferrer"
          >
            <span class="b-icon b-icon--fb"></span>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="b-footer-social__link"
            target="_blank"
            aria-label="graff instagram page"
            rel="nofollow noopener noreferrer"
          >
            <span class="b-icon b-icon--insta"></span>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="b-footer-social__link"
            target="_blank"
            aria-label="graff pinterest page"
            rel="nofollow noopener noreferrer"
          >
            <span class="b-icon b-icon--pin"></span>
          </NuxtLink>
        </div>
      </div>

      <div class="b-footer-body js-footer">
        <nav class="b-site-navigation b-footer-nav b-footer-body__inner">
          <div class="h-hidden h-dsp--block__sm">
            <div
              class="b-content-asset content-asset"
              data-content-id="footer-menu"
            >
              <div class="l-grid l-grid--gutter-0">
                <div
                  class="l-grid__row h-flex-jc--space-between h-flex-jc--center__m"
                >
                  <div>
                    <ul
                      class="b-footer-menu h-flex-ai--center__m h-text--center__m"
                    >
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Client Services</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Book An Appointment</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Contact Us</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Size Guide</NuxtLink
                        >
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul
                      class="b-footer-menu h-flex-ai--center__m h-text--center__m"
                    >
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Privacy Policy</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Terms of Use</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Cookie Policy</NuxtLink
                        >
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul
                      class="b-footer-menu h-flex-ai--center__m h-text--center__m"
                    >
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >This is Graff</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Find a Boutique</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Delaire Graff Estate</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Facet Foundation</NuxtLink
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="b-footer-menu__mobile js-footer__mobile-footer h-hidden__sm"
          >
            <div
              class="b-content-asset content-asset"
              data-content-id="footer-menu"
            >
              <!-- dwMarker="content" dwContentID="7f6de2dea46081e066c5bf2dfe" -->
              <div class="l-grid l-grid--gutter-0">
                <div
                  class="l-grid__row h-flex-jc--space-between h-flex-jc--center__m"
                >
                  <div>
                    <ul
                      class="b-footer-menu h-flex-ai--center__m h-text--center__m"
                      style="max-height: 140px"
                    >
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Client Services</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Book An Appointment</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Contact Us</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Size Guide</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Privacy Policy</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Terms of Use</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Cookie Policy</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >This is Graff</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Find a Boutique</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Delaire Graff Estate</NuxtLink
                        >
                      </li>
                      <li class="b-footer-menu__item h-pr--0__d">
                        <NuxtLink to="/" class="b-footer-menu__link"
                          >Facet Foundation</NuxtLink
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- End content-asset -->
          </div>
        </nav>
      </div>
    </div>
    <button
      class="b-back-to-top m-loaded"
      title="Back to top"
      aria-label="Back to top"
      data-cmp="backToTop"
    ></button>
  </footer>
</template>
<script setup>
definePageMeta({
  layout: "auth",
});

useHead({
  link: [
    {
      rel: "preload",
      href: "/assets/css/global.css",
      as: "style",
    },
    {
      rel: "stylesheet",
      href: "/assets/css/global.css",
    },
    {
      rel: "stylesheet",
      href: "/assets/css/main.css",
    },
    {
      rel: "preload",
      href: "/assets/css/bootstrap.min.css",
      as: "style",
    },
    {
      rel: "stylesheet",
      href: "/assets/css/bootstrap.min.css",
    },
  ],

  script: [
    {
      src: "/assets/js/main.js",
      defer: true,
      type: "text/javascript",
    },
  ],
});
</script>
<style>
.splide__pagination {
  display: none !important;
}
</style>
