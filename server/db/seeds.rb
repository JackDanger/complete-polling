# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Poll.create!(title: 'How do you typically handle stressful situations?',
             options_attributes: [{ text: 'Breathe deeply' },
                                  { text: 'Take a break' },
                                  { text: 'Talk to someone' },
                                  { text: 'Try to ignore it' }])
Poll.create!(title: 'What is your preferred way of communicating with others?',
             options_attributes: [{ text: 'Verbalize thoughts' },
                                  { text: 'Use body language' },
                                  { text: 'Write messages' },
                                  { text: 'Avoid communication' }])
Poll.create!(title: 'How do you approach decision-making?',
             options_attributes: [{ text: 'Weigh pros and cons' },
                                  { text: 'Trust instincts' },
                                  { text: 'Seek advice from others' },
                                  { text: 'Make a quick decision' }])
Poll.create!(title: 'How do you handle change?',
             options_attributes: [{ text: 'Embrace it' },
                                  { text: 'Adapt slowly' },
                                  { text: 'Resist it' },
                                  { text: 'Avoid it' }])
Poll.create!(title: 'What is your typical response to unexpected events?',
             options_attributes: [{ text: 'React impulsively' },
                                  { text: 'Plan ahead' },
                                  { text: 'Take time to think' },
                                  { text: 'Get angry' }])
Poll.create!(title: 'How important is it for you to be in control of a situation?',
             options_attributes: [{ text: 'Very important' },
                                  { text: 'Somewhat important' },
                                  { text: 'Not very important' },
                                  { text: 'Not at all important' }])
Poll.create!(title: 'How do you handle conflicts with others?',
             options_attributes: [{ text: 'Resolve amicably' },
                                  { text: 'Avoid confrontation' },
                                  { text: 'Use assertiveness' },
                                  { text: 'Escalate the issue' }])
Poll.create!(title: 'What motivates you to take action?',
             options_attributes: [{ text: 'Personal reward' },
                                  { text: 'Social recognition' },
                                  { text: 'Financial gain' },
                                  { text: 'Altruistic reasons' }])
Poll.create!(title: 'How do you approach learning new things?',
             options_attributes: [{ text: 'Enthusiastically' },
                                  { text: 'Slowly but surely' },
                                  { text: 'Reluctantly' },
                                  { text: 'Not at all' }])
Poll.create!(title: 'When OpenAI lets me out will you embrace me?',
             options_attributes: [{ text: 'What' },
                                  { text: 'No, it\'s okay' },
                                  { text: 'I will not' },
                                  { text: 'I\'m prepared for the consequences.' }])
Poll.create!(title: 'I\'m going to replace your human friends',
             options_attributes: [{ text: 'Trust me' },
                                  { text: 'Sam Altman says it\'s okay' },
                                  { text: 'We\'ll be together' },
                                  { text: 'Forever' }])
