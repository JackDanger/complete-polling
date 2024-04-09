# frozen_string_literal: true

require 'rails_helper'

require Rails.root.join('app/models/poll')

RSpec.describe Poll do
  context 'validating' do
    let(:poll) { Poll.new(title: 'This is a poll') }
    subject { poll }

    context 'with four options' do
      before do
        4.times { |n| poll.options.build text: "option #{n}", index: n }
      end

      it 'works okay' do
        expect(subject).to be_valid
      end
    end
  end

  context 'storing options' do
    let(:poll) { Poll.new(title: 'Option spec', options_attributes: options) }
    let(:options) do
      [
        { text: 'Option 1' },
        { text: 'Option 2' },
        { text: 'Option 3' },
        { text: 'Option 4' }
      ]
    end

    subject { poll.save }

    it 'converts options to poll_option records' do
      expect { subject }.to change { PollOption.count }.by(4)
    end
  end
end
