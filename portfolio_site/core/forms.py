# core/forms.py

from django import forms
import bleach

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
    my_honeypot = forms.CharField(
        required=False,
        widget=forms.HiddenInput,
        label="Leave empty",
    )


    def clean_my_honeypot(self):
        data = self.cleaned_data['my_honeypot']
        if data:
            # if the field is filled, suspect a bot
            raise forms.ValidationError("Spam detected.")
        return data

    def clean_content(self):
        raw_html = self.cleaned_data['content']
        allowed_tags = bleach.sanitizer.ALLOWED_TAGS + ['p', 'h1', 'h2', 'h3', 'ul', 'li', 'strong', 'em', 'a', 'blockquote']
        allowed_attrs = {'a': ['href', 'title', 'rel']}
        cleaned = bleach.clean(raw_html, tags=allowed_tags, attributes=allowed_attrs)
        return cleaned