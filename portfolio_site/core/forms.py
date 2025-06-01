# core/forms.py

from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-teal-500 transition',
            'placeholder': ' '
        })
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-teal-500 transition',
            'placeholder': ' '
        })
    )
    subject = forms.CharField(
        max_length=150,
        widget=forms.TextInput(attrs={
            'class': 'peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-teal-500 transition',
            'placeholder': ' '
        })
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'peer h-32 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 focus:outline-none focus:border-teal-500 transition resize-none',
            'placeholder': ' '
        })
    )