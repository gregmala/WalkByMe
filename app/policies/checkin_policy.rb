class CheckinPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def create?
    record.user == user
  end

  def show?
    record.user == user
  end

  def update?
    record.user == user
  end

  def end_trip?
    record.user == user
  end
end
