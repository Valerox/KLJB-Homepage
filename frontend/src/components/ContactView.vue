<script setup>
import { ref } from 'vue';
import Headline from './Headline.vue';
import emailjs from 'emailjs-com';

const name = ref("test@test.de");
const email = ref("valeroxlp@gmail.com");
const subject = ref("test");
const message = ref("test");

function sendEmail(e) {
    console.log(e);
    try {
        emailjs.sendForm('service_epv6kjx', 'template_tt3p0g5', e.target, '8C-PMO5ui1ahSqMAC', {
          subject: subject.value,
          from_name: name.value,
          to_mail: email.value,
          message: message.value
        })
      } catch(error) {
          console.log({error})
      }
      // Reset form field
      name.value = ''
      subject.value = ''
      email.value = ''
      message.value = ''
}

</script>


<template>
    <Headline title="Kontakt"></Headline>
    <section class="bg-white">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <form class="space-y-8" @submit="sendEmail">
                <div>
                    <input type="text"
                        class="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Name"
                        v-model="name">
                </div>
                <div>
                    <input type="email"
                        class="shadow-sm border border-gray-300  text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="E-Mail" required
                        v-model="email">
                </div>
                <div>
                    <input type="text"
                        class="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Betreff"
                        v-model="subject">
                </div>
                <div>
                    <textarea id="message" rows="6"
                        class="block p-2.5 w-full text-sm rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Nachricht"
                        v-model="message"/>
                </div>
                <button type="submit"
                    class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send
                    message</button>
            </form>
        </div>
    </section>
</template>