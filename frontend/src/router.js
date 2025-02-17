import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/HomeView.vue'
import LatestView from './components/LatestView.vue'
import ImpressumView from './components/ImpressumView.vue'
import DataPrivacyView from './components/DataPrivacyView.vue'
import WineFestView from './components/WineFestView.vue'
import ContactView from './components/ContactView.vue'
import CalenderView from './components/CalenderView.vue'
import About from './components/About.vue'
import AdminPage from './components/AdminPage.vue'
import AdminEventList from './components/AdminEventList.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/latest', component: LatestView },
  { path: '/impressum', component: ImpressumView },
  { path: '/dataprivacy', component: DataPrivacyView },
  { path: '/winefest', component: DataPrivacyView },
  { path: '/contact', component: ContactView },
  { path: '/events', component: CalenderView },
  { path: '/about', component: About },
  { path: '/admin', component: AdminPage },
  { path: '/admin/events', component: AdminEventList },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})