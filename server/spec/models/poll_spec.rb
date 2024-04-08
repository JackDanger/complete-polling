require 'rails_helper'

require Rails.root.join('app/models/poll')

RSpec.describe Poll do
  context "validating" do

    let(:poll) { Poll.new(title: "This is a poll") }
    subject { poll }

    context "without any options" do
      before do
        poll.options.clear
      end

      it "is invalid" do
        expect(subject).to_not be_valid
      end
    end
    context "with four options" do
      before do
        4.times {|n| poll.options.build text: "option #{n}", index: n }
      end

      it "works okay" do
        expect(subject).to be_valid
      end
    end
  end
end
