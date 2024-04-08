require 'rails_helper'

require Rails.root.join('app/models/poll')

RSpec.describe Poll do
  context "validating" do

    let(:poll) { Poll.new }
    subject { poll.valid? }

    context "without any options" do
      before do
        poll.poll_options.clear
      end

      it "is invalid" do
        expect
      end
    end
    context "with four options" do
      before do
        4.times {|n| poll.poll_options.build text: "option #{n}", index: n }
      end

      it "persists" do
        expect(:subject).to be_truthy
      end
    end
  end
end
